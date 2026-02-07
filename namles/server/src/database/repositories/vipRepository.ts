import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Vip from "../models/vip";
import ProductRepository from "./productRepository";
import Product from "../models/product";

class VipRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Create VIP record
    const [record] = await Vip(options.database).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    const items = {
      vipId: record.id,
      comisionrate: record.comisionrate,
      min: record.min,
      max: record.max,
    };

    // Count total VIPs
    const totalVip = await VipRepository.count({}, options);

    // Mapping between totalVip and corresponding function
    const vipMap = {
      1: ProductRepository.Vip1,
      2: ProductRepository.Vip2,
      3: ProductRepository.Vip3,
      4: ProductRepository.Vip4,
      5: ProductRepository.Vip5,
    };

    const vipHandler = vipMap[totalVip];
    if (vipHandler) {
      const values = (await vipHandler(items)) || [];

      // Run product creations in parallel for better performance
      await Promise.all(
        values.map((item) =>
          ProductRepository.create(
            { ...item, tenant: currentTenant.id },
            options
          )
        )
      );
    }

    // Log creation
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    );

    // Return created record with details
    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Vip(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    // Check if min or max values are being updated
    const minChanged = data.min !== undefined && data.min !== record.min;
    const maxChanged = data.max !== undefined && data.max !== record.max;
    const priceRangeChanged = minChanged || maxChanged;

    // Update the VIP record
    await Vip(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    // If price range changed, update all products for this VIP
    if (priceRangeChanged) {
      // Use the new values if provided, otherwise use the existing ones
      const finalMin = data.min !== undefined ? data.min : record.min;
      const finalMax = data.max !== undefined ? data.max : record.max;

      await this.updateProductPricesForVip(id, finalMin, finalMax, options);
    }

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

  /**
   * Update all product prices for a specific VIP with new min/max range
   */
  static async updateProductPricesForVip(vipId, newMin, newMax, options: IRepositoryOptions) {
    try {

      // Find all products for this VIP - await the query and wrap with session if exists
      const products = await MongooseRepository.wrapWithSessionIfExists(
        Product(options.database).find({ vip: vipId }),
        options
      );

      if (!products || products.length === 0) {
        return;
      }


      // Update each product with new random price based on new range
      const updatePromises = products.map(async (product) => {
        const newPrice = await this.generateRandomPriceForProduct(newMin, newMax);

        return Product(options.database).updateOne(
          { _id: product._id },
          {
            amount: newPrice,
            updatedBy: MongooseRepository.getCurrentUser(options).id
          },
          options
        );
      });

      await Promise.all(updatePromises);


    } catch (error) {
      console.error(`Error updating product prices for VIP ${vipId}:`, error);
      throw error;
    }
  }

    static async generateRandomPriceForProduct(minStr, maxStr) {
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    if (isNaN(min) || isNaN(max)) {
      throw new Error('Invalid min or max values for price generation');
    }

    // Ensure min is not greater than max
    const actualMin = Math.min(min, max);
    const actualMax = Math.max(min, max);

    const randomPrice = (Math.random() * (actualMax - actualMin) + actualMin).toFixed(2);
    return randomPrice;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Vip(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Vip(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Vip(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Vip(options.database).findById(id).populate("members"),
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

      if (filter.levellimit) {
        criteriaAnd.push({
          levellimit: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.levellimit),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_ASC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
    let rows = await Vip(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("members");

    const count = await Vip(options.database).countDocuments(criteria);

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

    const records = await Vip(options.database)
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
        entityName: Vip(options.database).modelName,
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
}

export default VipRepository;
