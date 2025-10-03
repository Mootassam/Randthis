import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import TransactionRepository from "../database/repositories/TransactionRepository";
import Error402 from "../errors/Error402";
import Error405 from "../errors/Error405";

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
      // await this.checkpermission(this.options)
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

      // If transaction is a deposit, update user balance
      if (data.type === 'deposit') {
        await this.updateUserBalance(data.user, data.amount, session);
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

  async updateUserBalance(userId, amount, session) {
    const User = this.options.database.model('user');

    await User.findByIdAndUpdate(
      userId,
      {
        $inc: { balance: parseFloat(amount) }
      },
      { session }
    );
  }

  async checkSolde(data, options) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    if (!data) {
      throw new Error405("Please write amount");
    }
    const amount = data.amount;
    const type = data.type;

    if (type === "withdraw") {
      // if (!currentUser.trc20) {
      //   throw new Error405(
      //     'Please go to the "Wallet" section to bind your USDT (TRC20) or ERC20 address before submitting a withdrawal request.'
      //   );
      // }

      // if (currentUser.withdrawPassword == data.withdrawPassword) {
      //   if (currentUser.balance < amount) {
      //     throw new Error405(
      //       "It looks like your withdrawal amount exceeds your balance"
      //     );
      //   }
      // } else {
      //   throw new Error405(
      //     "Your withdraw Password is not correct please check again"
      //   );
      // }
    }

    // For deposit transactions, no additional validation needed
    // just update the balance as shown above
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

  async updateTransactionStatus(transactionId, newStatus, options) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const Transaction = this.options.database.model('transaction');
      const User = this.options.database.model('user');

      // Find the transaction
      const transaction = await Transaction.findById(transactionId)
        .session(session);

      if (!transaction) {
        throw new Error405('Transaction not found');
      }

      // Update transaction status
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          status: newStatus,
          updatedBy: MongooseRepository.getCurrentUser(options)?._id
        },
        { new: true, session }
      );

      // If status is updated to 'success' and it's a withdrawal, deduct from balance
      if (newStatus === 'success' && transaction.type === 'withdraw') {
        await User.findByIdAndUpdate(
          transaction.user,
          {
            $inc: { balance: -parseFloat(transaction.amount) }
          },
          { session }
        );
      }

      // If status is updated from 'success' to another status and it's a withdrawal, refund the amount
      if (transaction.status === 'success' && newStatus !== 'success' && transaction.type === 'withdraw') {
        await User.findByIdAndUpdate(
          transaction.user,
          {
            $inc: { balance: parseFloat(transaction.amount) }
          },
          { session }
        );
      }

      await MongooseRepository.commitTransaction(session);
      return updatedTransaction;

    } catch (error) {
      await MongooseRepository.abortTransaction(session);
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
