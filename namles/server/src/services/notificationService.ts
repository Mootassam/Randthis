import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import NotificationRepository from "../database/repositories/NotificationRepository";
import Error402 from "../errors/Error402";
import Error405 from "../errors/Error405";
import Notification from "../database/models/notification";

export default class NotificationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {

      const values = {
        status: data.status,
        datetransaction: data.datetransaction,
        user: data.user,
        type: data.type,
        amount: data.amount,
        photo: data.photo,
      };

      const record = await NotificationRepository.create(values, {
        ...this.options,
        session,
      });

      // Create notification for transaction creation


      // For deposit transactions, update user balance



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

  async countUnreadByUser(options) {
    return NotificationRepository.countUnread(options);
  }



  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await NotificationRepository.update(id, data, {
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
        await NotificationRepository.destroy(id, {
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
    return NotificationRepository.findById(id, this.options);
  }


   async markRead(id) {
    return NotificationRepository.markAsRead(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return NotificationRepository.findAllAutocomplete(
      search,
      limit,
      this.options
    );
  }

  async findAndCountAll(args) {
    return NotificationRepository.findAndCountAll(args, this.options);
  }

  async findAndCountByUser(args) {
    return NotificationRepository.findAndCountByUser(args, this.options);
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
    const count = await NotificationRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}