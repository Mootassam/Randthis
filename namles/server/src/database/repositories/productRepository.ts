import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Product from "../models/product";
import UserRepository from "./userRepository";
import RecordRepository from "./recordRepository";
import Error405 from "../../errors/Error405";
import Error400 from "../../errors/Error400";
import axios from "axios";
import VipRepository from "./vipRepository";

class ProductRepository {
static async create(data, options: IRepositoryOptions) {
  const products = await this.CreateProduct(data, options); // returns array

  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);

  // Add tenant and user info to each product
  const productsToInsert = products.map(product => ({
    ...product,
    tenant: currentTenant.id,
    createdBy: currentUser.id,
    updatedBy: currentUser.id,
  }));

  // Bulk insert
  const records = await Product(options.database).insertMany(productsToInsert, options);

  // Create audit logs for each product
  for (const record of records) {
    await this._createAuditLog(AuditLogRepository.CREATE, record._id, record, options);
  }

  return records;
}


static async CreateProduct(data, options) {
  const mongoose = require("mongoose");

  const findvip = await VipRepository.findById(data.vip, options);
  if (!findvip) throw new Error("VIP not found");

  const productResponse = await axios.get("https://dummyjson.com/products?limit=100");
  const items = productResponse.data.products;

  // Generate product array
  const values = items.map((item: any) => ({
    title: item.title || "",
    image: item.thumbnail || "",
    commission: findvip.comisionrate,
    vip: mongoose.Types.ObjectId(findvip._id),
    amount: String(item.price || 0) // fallback if API has no price
  }));

  return values;
}




  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Product(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Product(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id).populate("vip"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.title) {
        criteriaAnd.push({
          title: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.title),
            $options: "i",
          },
        });
      }

      if (filter.amount) {
        criteriaAnd.push({
          amount: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.amount),
            $options: "i",
          },
        });
      }
      if (filter.vip) {
        criteriaAnd.push({
          vip: filter.vip,
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Product(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .populate("vip")
      .sort(sort);

    const count = await Product(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            titre: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Product(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Product(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options
    );
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject ? record.toObject() : record;
    output.photo = await FileRepository.fillDownloadUrl(output.photo);

    return output;
  }

  static async grapOrders(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentVip = MongooseRepository.getCurrentUser(options).vip.id;
    const mergeDataPosition = currentUser.itemNumber;
    const giftPosition = currentUser.prizesNumber;

    if (!currentUser?.vip) {
      throw new Error400(
        options.language,
        "validation.requiredSubscription"
      );
    }

    const dailyOrder = currentUser.vip.dailyorder;

    if (currentUser.tasksDone >= dailyOrder) {

      throw new Error400(
        options.language,
        "validation.moretasks"
      );
    }

    if (currentUser.balance <= 0) {
      throw new Error400(
        options.language,
        "validation.deposit"
      );
    }
    if (currentUser.balance < 0) {
      throw new Error400(
        options.language,
        "validation.InsufficientBalance"
      );
    }

    if (currentUser && currentUser.product && currentUser.product.id && currentUser.tasksDone === (mergeDataPosition - 1)) {
      let prodcut = currentUser.product;
      prodcut.photo = await FileRepository.fillDownloadUrl(prodcut?.photo);
      return prodcut;
    } else if (currentUser && currentUser.prizes && currentUser.prizes.id && currentUser.tasksDone === (giftPosition - 1)) {

      let prodcut = currentUser.prizes;
      prodcut.photo = await FileRepository.fillDownloadUrl(prodcut?.photo);
      return prodcut;

    } else {
      let record = await Product(options.database)
        .find({ vip: currentVip, type: 'normal' })
        .populate("vip");
      const random = Math.floor(Math.random() * record.length);
      record = await Promise.all(record.map(this._fillFileDownloadUrls));
      return record[random];
    }
  }



}

export default ProductRepository;
