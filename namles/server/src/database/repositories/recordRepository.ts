import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Records from "../models/records";
import Error405 from "../../errors/Error405";
import Dates from "../utils/Dates";
import Product from "../models/product";
import UserRepository from "./userRepository";
import User from "../models/user";
import Error400 from "../../errors/Error400";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

class RecordRepository {
static async create(data, options: IRepositoryOptions) {
    const { database } = options;
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    const mergeDataPosition = currentUser.itemNumber;

    // Execute parallel checks where possible
    await Promise.all([
      this.checkOrder(options),
      this.calculeGrap(data, options)
    ]);

    // Calculate position conditions
    const hasProduct = currentUser?.product?.[0]?.id;
    const isPositionMatch = currentUser.tasksDone === (mergeDataPosition - 1); // mergeDataPosition needs to be defined

    // Use bulk operations for better performance
    const bulkOps = [
      {
        updateOne: {
          filter: { _id: currentUser.id },
          update: {
            $inc: { tasksDone: 1 },
            $set: { updatedAt: new Date() }
          }
        }
      }
    ];

    let records = [];
    
    // Check if ALL conditions are met for product combo creation
    if (hasProduct && isPositionMatch) {
      // Calculate combo price (if needed)
      let comboprice = 0;
      if (currentUser.product && Array.isArray(currentUser.product)) {
        currentUser.product.forEach((item) => {
          comboprice += parseFloat(item.amount) || 0;
        });
      }

      // Create one record for each product in the array (PRODUCT COMBO MODE)
      const recordDataArray = currentUser.product.map((productId, index) => {
        // Determine status: first one gets status from data (or default), others get "frozen"
        const status = index === 0 
          ? (data.status || "pending")  // First record: use data status or "pending"
          : "frozen";                   // Other records: always "frozen"
        
        return {
          ...data,
          product: productId, // Override the product from data with current product
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
          date: Dates.getDate(),
          datecreation: Dates.getTimeZoneDate(),
          status: status // Apply the determined status
        };
      });

      // Create multiple records
      records = await Records(database).create(recordDataArray, options);
      
      // Update tasksDone count to reflect multiple records created
      bulkOps[0].updateOne.update.$inc.tasksDone = currentUser.product.length;
      
      console.log(`Created ${currentUser.product.length} records in COMBO mode (position matched)`);
      
    } else {
      // NORMAL SINGLE RECORD CREATION (position doesn't match or no product)
      console.log(`Creating single record in NORMAL mode`);
      
      const recordData = {
        ...data,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        date: Dates.getDate(),
        datecreation: Dates.getTimeZoneDate(),
        // Keep the status from data (could be "pending", "completed", or "frozen")
      };

      // Create single record
      records = await Records(database).create([recordData], options);
    }

    await User(database).bulkWrite(bulkOps);

    // Fire and forget audit log - don't block response
    // Log for all created records
    records.forEach(record => {
      this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        data,
        options
      ).catch(error => {
        console.error('Audit log creation failed:', error);
      });
    });

    // Return the first record for backward compatibility
    return this.findById(records[0].id, options);
  }


   static async checkOrderCombo(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = this.getTimeZoneDate(); // Get current date

    const record = await Records(options.database)
      .find({
        user: currentUser.id,
        // Compare dates in the same format
        datecreation: { $in: Dates.getTimeZoneDate() }, // Convert current date to Date object
      })
      .countDocuments();

    const dailyOrder = currentUser.vip.dailyorder;
    const mergeDataPosition = currentUser.itemNumber;

    if (currentUser && currentUser.vip && currentUser.vip.id) {
      if (currentUser.tasksDone >= dailyOrder) {
        throw new Error405(
          "This is your limit. Please contact customer support for more tasks"
        );
      }

      

      if (currentUser.balance <= 0) {
        throw new Error405("insufficient balance please upgrade.");
      }

    // if (currentUser.balance <= 49) {
    //     throw new Error405("Your account must have a minimum balance of 50 USDT.");
    //   }

      
    } else {
      throw new Error405("Please subscribe to at least one VIP package.");
    }
  }


  static async calculeGrap(data, options) {
    const { database } = options;
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Parallel database calls
    const [currentProduct, orderCount] = await Promise.all([
      Product(database).findById(data.product).lean(),
      this.CountOrder(options)
    ]);

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    const currentUserBalance = currentUser?.balance || 0;
    const productBalance = currentProduct.amount;
    const currentCommission = currentProduct.commission;
    const mergeDataPosition = currentUser.itemNumber;
    const prizesPosition = currentUser.prizesNumber;

    let total, frozen, status;

    // Cache user product check
    const hasProduct = currentUser?.product[0]?.id;
    const isPositionMatch = currentUser.tasksDone === (mergeDataPosition - 1);
    const hasPrizes = currentUser?.prizes?.id;

    const isPrizesMatch = currentUser.tasksDone === (prizesPosition - 1);



    if (hasProduct && isPositionMatch) {


          let comboprice = 0;

      if (currentUser.product && Array.isArray(currentUser.product)) {
        currentUser.product.forEach((item) => {
          comboprice += parseFloat(item.amount) || 0;
        });
      }
      total = Number(currentUserBalance) - Number(comboprice);
      frozen = Number(currentUserBalance);
      status = "pending"


    } else if (hasPrizes && isPrizesMatch) {

      total = Number(currentUserBalance) + Number(productBalance);
      status = "completed"

    } else {
      // Find invited user only if needed
      const invitedUser = await User(database).findOne({
        refcode: currentUser.invitationcode
      }).lean();

      if (invitedUser) {
        const commissionAmount = Number(currentCommission) * 0.20;

        await User(database).updateOne(
          { _id: invitedUser._id },
          {
            $inc: { balance: commissionAmount },
            $set: { updatedAt: new Date() }
          }
        );
      }

      total = Number(currentUserBalance) + this.calculeTotal(productBalance, currentCommission);
      frozen = 0;
    }


    const updatedValues = {
      balance: total,
      freezeblance: frozen,
      updatedAt: new Date()
    };

    await UserRepository.updateProfileGrap(
      currentUser.id,
      updatedValues,
      options
    );
  }

  // Utility functions with validation
  static calculeTotal(price, commission) {
    const numPrice = Number(price);
    const numCommission = Number(commission);

    if (isNaN(numPrice) || isNaN(numCommission)) {
      throw new Error('Invalid price or commission values');
    }

    return (numPrice * numCommission) / 100;
  }

  static calculeTotalMerge(price, commission) {
    const numPrice = Number(price);
    const numCommission = Number(commission);

    if (isNaN(numPrice) || isNaN(numCommission)) {
      throw new Error405('Invalid price or commission values');
    }

    return numPrice + (numPrice * numCommission) / 100;
  }

  static async CountOrder(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = Dates.getTimeZoneDate();

    const record = await Records(options.database)
      .countDocuments({
        user: currentUser.id,
        datecreation: currentDate
      });

    return { record };
  }

  static async tasksDone(currentUser, options) {
    const user = await User(options.database)
      .findById(currentUser)
      .select('tasksDone')
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    return { record: user.tasksDone || 0 };
  }

  static async checkOrder(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = Dates.getTimeZoneDate();

    // Use Promise.all for parallel execution
    const [recordCount, userVip] = await Promise.all([
      Records(options.database).countDocuments({
        user: currentUser.id,
        datecreation: currentDate
      }),
      // Get fresh VIP data to ensure accuracy
      User(options.database)
        .findById(currentUser.id)
        .select('vip balance tasksDone')
        .lean()
    ]);

    if (!userVip?.vip) {
      throw new Error400(
        options.language,
        "validation.requiredSubscription"
      );
    }

    const dailyOrder = userVip.vip.dailyorder;

    if (userVip.tasksDone >= dailyOrder) {
      throw new Error400(
        options.language,
        "validation.moretasks"
      );
    }

    if (userVip.balance <= 0) {


      throw new Error400(
        options.language,
        "validation.InsufficientBalance"
      );
    }
  }



  static getTimeZoneDate() {
    const dubaiTimezone = "Asia/Dubai";

    const options = {
      timeZone: dubaiTimezone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const currentDateTime = new Date().toLocaleDateString("en-US", options);

    return currentDateTime;
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Records(options.database).updateOne(
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


static async updateStatus(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    const session = options?.session;

    // Start transaction if session is provided
    if (session) {
      session.startTransaction();
    }

    try {
      // Fetch the current user with product details
      const user = await User(options.database)
        .findById(currentUser.id)
        .populate('product') // Populate product details to get commission
        .session(session || null);

      if (!user) {
        throw new Error404();
      }

      // Check if user has products
      if (!user.product || !Array.isArray(user.product) || user.product.length === 0) {
        throw new Error405('No products found for this user');
      }

      // FIRST: Check if user has sufficient balance (not 0 or negative)
      const currentBalance = parseFloat(user.balance) || 0;
      if (currentBalance <= 0) {
        throw new Error405('Please contact the customer service to recharge');
      }

      const productIds = user.product.map(product => product._id || product);

      // Get all records with product details for commission calculation
      const records = await Records(options.database)
        .find({
          tenant: currentTenant.id,
          user: currentUser.id,
          product: { $in: productIds }
        })
        .populate('product') // Populate to get product details
        .session(session || null);

      if (!records || records.length === 0) {
        throw new Error405('No records found for the user\'s products');
      }

      // Calculate total commission from all records
      let totalCommission = 0;
      
      // Process each record to calculate commission
      for (const record of records) {
        if (record.product && record.product.amount && record.product.commission) {
          // Calculate commission for this record
          const recordCommission = this.calculeTotal(
            record.product.amount,
            record.product.commission
          );
          totalCommission += recordCommission;
        } else if (record.product && record.product.type === "prizes" && record.product.amount) {
          // For prizes type, the entire amount is the commission
          totalCommission += parseFloat(record.product.amount) || 0;
        }
      }

      // Calculate new balance: current balance + frozen balance + total commission
      const frozenBalance = parseFloat(user.freezeblance) || 0;
      const newBalance = currentBalance + frozenBalance + totalCommission;

      // Update all matching records to completed
      await Records(options.database).updateMany(
        {
          tenant: currentTenant.id,
          user: currentUser.id,
          product: { $in: productIds }
        },
        {
          status: 'completed',
          updatedBy: currentUser.id,
          updatedAt: new Date()
        },
        { session, ...options }
      );

      // Clear user's product array, itemNumber, and update balance
      await User(options.database).updateOne(
        { _id: currentUser.id },
        {
          $set: {
            product: [], // Clear the product array
            itemNumber: 0, // Set itemNumber to 0
            balance: newBalance, // Update with new balance
            freezeblance: 0 // Reset frozen balance to 0
          },
          $inc: { 
            tasksDone: productIds.length // Increment tasksDone by number of products
          },
          updatedBy: currentUser.id,
          updatedAt: new Date()
        },
        { session, ...options }
      );

      // Commit transaction if started
      if (session) {
        await session.commitTransaction();
      }

      // Fire-and-forget audit logs for records
      records.forEach(record => {
        this._createAuditLog(
          AuditLogRepository.UPDATE,
          record._id,
          { status: 'completed' },
          options
        ).catch(console.error);
      });

      // Return first record as before
      return this.findById(records[0]._id, options);

    } catch (error) {
      // Abort transaction on error
      if (session) {
        await session.abortTransaction();
      }
      throw error;
    }
  }





  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Records(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database)
        .findById(id)
        .populate("user")
        .populate("product"),
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
    const currentUser = MongooseRepository.getCurrentUser(options);
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

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }
      if (filter.product) {
        criteriaAnd.push({
          product: filter.product,
        });
      }

      if (filter.number) {
        criteriaAnd.push({
          number: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.number),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.status),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    const count = await Records(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

static async findAndCountAllMobile(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
      user: currentUser.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }
      if (filter.product) {
        criteriaAnd.push({
          product: filter.product,
        });
      }

      if (filter.number) {
        criteriaAnd.push({
          number: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.number),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        // ALWAYS: when status is "pending", return both "pending" and "frozen"
        if (filter.status.toLowerCase() === "pending") {
          criteriaAnd.push({
            status: {
              $in: ["pending", "frozen"] // Include both statuses
            }
          });
        } else {
          // For other statuses ("completed", "frozen"), use exact match
          criteriaAnd.push({
            status: filter.status
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let listitems = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("user")
      .populate("product");

    let rows = await Records(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    const count = await Records(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    let total = 0;

    listitems.map((item) => {
      let data = item.product;
      let itemTotal =
        (parseFloat(data.commission) * parseFloat(data.amount)) / 100;

      total += itemTotal;
    });
    total = parseFloat(total.toFixed(3));

    return { rows, count, total };
  }

  static async findAndCountPerDay(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
      user: currentUser.id,
    });

    criteriaAnd.push({
      status: {
        $regex: MongooseQueryUtils.escapeRegExp("completed"),
        $options: "i",
      },
    });

    const start = new Date();
    start.setHours(0, 0, 0, 0); // Set to the start of the current day
    const end = new Date();
    end.setHours(23, 59, 59, 999); // Set to the end of the current day
    criteriaAnd.push({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let listitems = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("user")
      .populate("product");

    // let rows = await Records(options.database)
    //   .find(criteria)
    //   .limit(limitEscaped)
    //   .sort(sort)
    //   .populate("user")
    //   .populate("product");

    // const count = await Records(options.database).countDocuments(criteria);

    // rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    let total = 0;

    listitems.map((item) => {
      let data = item.product;
      let itemTotal =
        (parseFloat(data.commission) * parseFloat(data.amount)) / 100;

      total += itemTotal;
    });
    total = parseFloat(total.toFixed(3));

    return { total };
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

    const records = await Records(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.titre,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Records(options.database).modelName,
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
    output.product.photo = await FileRepository.fillDownloadUrl(
      output?.product?.photo
    );

    return output;
  }
}

export default RecordRepository;
