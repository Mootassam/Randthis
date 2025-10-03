import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import TransactionRepository from "../database/repositories/TransactionRepository";
import Error402 from "../errors/Error402";
import Error405 from "../errors/Error405";
import Notification from "../database/models/notification";

export default class TransactionService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      await this.checkSolde(data, { ...this.options });

      const values = {
        status: data.status,
        datetransaction: data.datetransaction,
        user: data.user,
        type: data.type,
        amount: data.amount,
        photo: data.photo,
      };

      const record = await TransactionRepository.create(values, {
        ...this.options,
        session,
      });

      // Create notification for transaction creation
      await this.createNotification(
        record.user,
        record._id,
        data.type,
        'created',
        data.amount,
        { ...this.options, session }
      );

      // For deposit transactions, update user balance
      if (data.type === 'deposit') {
        await this.updateUserBalance(data.user, data.amount, session, 'inc');

        // Create notification for deposit success
        await this.createNotification(
          data.user,
          record._id,
          'deposit',
          'completed',
          data.amount,
          { ...this.options, session }
        );
      }

      // For withdrawal transactions, deduct balance immediately
      if (data.type === 'withdraw') {
        await this.updateUserBalance(data.user, data.amount, session, 'dec');

        // Create notification for withdrawal submission
        await this.createNotification(
          data.user,
          record._id,
          'withdraw',
          'submitted',
          data.amount,
          { ...this.options, session }
        );
      }

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async updateUserBalance(userId, amount, session, operation = 'inc') {
    const User = this.options.database.model('user');
    const update = operation === 'inc'
      ? { $inc: { balance: parseFloat(amount) } }
      : { $inc: { balance: -parseFloat(amount) } };

    await User.findByIdAndUpdate(userId, update, { session });
  }

  async createNotification(userId, transactionId, type, action, amount, options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let title, message;

    switch (action) {
      case 'created':
        title = `${type.charAt(0).toUpperCase() + type.slice(1)} Request Created`;
        message = `Your ${type} request for $${amount} has been submitted and is under review.`;
        break;
      case 'submitted':
        title = `Withdrawal Submitted`;
        message = `Your withdrawal request for $${amount} has been submitted successfully.`;
        break;
      case 'completed':
        title = `Deposit Completed`;
        message = `Your deposit of $${amount} has been completed successfully.`;
        break;
      case 'success':
        title = `Transaction Approved`;
        message = `Your ${type} of $${amount} has been approved and completed.`;
        break;
      case 'canceled':
        title = `Transaction Canceled`;
        message = `Your ${type} request for $${amount} has been canceled.`;
        break;
      default:
        title = `Transaction Update`;
        message = `Your transaction status has been updated.`;
    }

    await Notification(options.database).create([{
      title,
      message,
      type,
      status: 'unread',
      user: userId,
      transaction: transactionId,
      amount: amount.toString(),
      tenant: currentTenant.id,
      createdBy: currentUser.id,
    }], options);
  }

  async checkSolde(data, options) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    if (!data) {
      throw new Error405("Please write amount");
    }
    const amount = data.amount;
    const type = data.type;

    if (type === "withdraw") {
      if (!currentUser.trc20) {
        throw new Error405(
          'Please go to the "Wallet" section to bind your USDT (TRC20) or ERC20 address before submitting a withdrawal request.'
        );
      }

      if (currentUser.withdrawPassword == data.withdrawPassword) {
        if (currentUser.balance < amount) {
          throw new Error405(
            "It looks like your withdrawal amount exceeds your balance"
          );
        }
      } else {
        throw new Error405(
          "Your withdraw Password is not correct please check again"
        );
      }
    }
  }

  async updateTransactionStatus(transactionId, newStatus, options) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const Transaction = this.options.database.model('transaction');
      const User = this.options.database.model('user');

      // Find the transaction with user data
      const transaction = await Transaction.findById(transactionId)
        .populate('user')
        .session(session);

      if (!transaction) {
        throw new Error405('Transaction not found');
      }

      const oldStatus = transaction.status;
      const amount = parseFloat(transaction.amount);

      // Update transaction status
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          status: newStatus,
          updatedBy: MongooseRepository.getCurrentUser(options).id
        },
        { new: true, session }
      );

      // Create notification for status update
      await this.createNotification(
        transaction.user._id,
        transactionId,
        transaction.type,
        newStatus,
        transaction.amount,
        { ...this.options, session }
      );

      // Handle withdrawal transactions - only return money if canceled
      if (transaction.type === 'withdraw') {
        // Case: Status changed to 'canceled' - return the amount
        if (newStatus === 'canceled') {
          await User.findByIdAndUpdate(
            transaction.user._id,
            { $inc: { balance: amount } },
            { session }
          );
        }

        // Case: Status changed from 'canceled' to 'success' - deduct again
        else if (oldStatus === 'canceled' && newStatus === 'success') {
          await User.findByIdAndUpdate(
            transaction.user._id,
            { $inc: { balance: -amount } },
            { session }
          );
        }
      }

      await MongooseRepository.commitTransaction(session);
      return updatedTransaction;

    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async checkpermission(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    if (currentUser.withdraw) return;

    throw new Error405("Should be contact the customer service about this");
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await TransactionRepository.update(id, data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      for (const id of ids) {
        await TransactionRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return TransactionRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return TransactionRepository.findAllAutocomplete(
      search,
      limit,
      this.options
    );
  }

  async findAndCountAll(args) {
    return TransactionRepository.findAndCountAll(args, this.options);
  }

  async findAndCountByUser(args) {
    return TransactionRepository.findAndCountByUser(args, this.options);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashRequired"
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashExistent"
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await TransactionRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}