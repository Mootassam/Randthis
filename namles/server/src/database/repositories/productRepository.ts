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
import Records from "../models/records";
import Dates from "../utils/Dates";
class ProductRepository {

  private static baseConfig = {
    "cookie": "ka_sessionid=e640b3c97cfe71f93dfe325044927bea; _ga=GA1.1.177993782.1768309588; ACCEPTED_COOKIES=true; CSRF-TOKEN=CfDJ8KfhQMrVil5MrZ6RWpmB4eHA29kiQtH4u7H6C2ecCN4tIbxJKgfubhbksobPqXPjddBEIvbL59pJKlSIbwSEAKsmlhbObtdDnl9tcWevtQ; __Host-KAGGLEID=CfDJ8KfhQMrVil5MrZ6RWpmB4eEu-3kEJhbIwyP5QjRuTioQ-M3w05ZD3FfUm0GCttke2I0KMy8RpGXA0g7_P-M79KGOYJXEnL55aq9Xynuk6ojVvZKu0wmhWRAl; GCLB=CMLJ3oHN6q3N-QEQAw; build-hash=c6ad8839b6661c802b08f6f0de90ea98445b51d5; ka_db=CfDJ8KfhQMrVil5MrZ6RWpmB4eGeY6qGUr6oMxoKBjzddJk7H7IjU_Pd1GGcaSDGgfz93Mo4jWzghmkHBO_y5S692aouPXZj7_KksqyVKWNepLnGuLLBb1XHIGPeda8; XSRF-TOKEN=CfDJ8KfhQMrVil5MrZ6RWpmB4eFxtDHfEouclhOe2erJ_1SKE3kVt5AULsjUvz20s9a4MK-lxeIKBCXFLC4HW64K04kEmW0x8EtT1cLn0Khns73ETyOCPdMtOlZm5CQ_pqEsd6lMIPrJ7Q5ZZNEn4RdlMNg; CLIENT-TOKEN=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJrYWdnbGUiLCJhdWQiOiJjbGllbnQiLCJzdWIiOiJib3VnaGRpcmkiLCJuYnQiOiIyMDI2LTAyLTA2VDIyOjMzOjUwLjgzMDIxMTJaIiwiaWF0IjoiMjAyNi0wMi0wNlQyMjozMzo1MC44MzAyMTEyWiIsImp0aSI6ImUxZGE3YWNhLWZkNmQtNDFiMi05NDI1LTQ2ZTAxYTdlZmRhMCIsImV4cCI6IjIwMjYtMDMtMDZUMjI6MzM6NTAuODMwMjExMloiLCJ1aWQiOjI1NjkwMzIsImRpc3BsYXlOYW1lIjoiTW9vdHNzYW0iLCJlbWFpbCI6Im1vb3Rhc3NhbWVAZ21haWwuY29tIiwidGllciI6ImNvbnRyaWJ1dG9yIiwidmVyaWZpZWQiOmZhbHNlLCJwcm9maWxlVXJsIjoiL2JvdWdoZGlyaSIsInRodW1ibmFpbFVybCI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9rYWdnbGUtYXZhdGFycy90aHVtYm5haWxzL2RlZmF1bHQtdGh1bWIucG5nIiwiZmZoIjoiYWVmNzZiZGExMzMyM2NhMGRlZTJlYmU3Y2FjOTE3MmY4NmU0MjdiYTY5MjQ1MGUxOTg1MjVkYTk0ZDE1YmY4MSIsInBpZCI6ImthZ2dsZS0xNjE2MDciLCJzdmMiOiJ3ZWItZmUiLCJzZGFrIjoiQUl6YVN5QTRlTnFVZFJSc2tKc0NaV1Z6LXFMNjU1WGE1SkVNcmVFIiwiYmxkIjoiYzZhZDg4MzliNjY2MWM4MDJiMDhmNmYwZGU5MGVhOTg0NDViNTFkNSJ9.; _ga_T7QHS60L4Q=GS2.1.s1770416994$o10$g1$t1770417230$j59$l0$h0",
    "origin": "https://www.kaggle.com",
    "referer": "https://www.kaggle.com/datasets/asaniczka/amazon-canada-products-2023-2-1m-products",
    "x-kaggle-build-version": "29506ea853cc6a3a542f130dec2b4a40863d7254",
    "Content-Type": "application/json",
    "x-xsrf-token": "CfDJ8KfhQMrVil5MrZ6RWpmB4eFxtDHfEouclhOe2erJ_1SKE3kVt5AULsjUvz20s9a4MK-lxeIKBCXFLC4HW64K04kEmW0x8EtT1cLn0Khns73ETyOCPdMtOlZm5CQ_pqEsd6lMIPrJ7Q5ZZNEn4RdlMNg"
  };
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const [record] = await Product(options.database).create(
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

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    );

    return this.findById(record.id, options);
  }


  private static async fetchKaggleData(dataConfig: any, value: any, titleIndex: number, imageIndex: number) {
    const url = "https://www.kaggle.com/api/i/datasets.DatasetService/GetDataViewExternal";

    try {
      const response = await axios.post(url, dataConfig, { headers: this.baseConfig });
      const payload = response?.data?.dataView?.dataTable?.rows;

      if (!payload || !Array.isArray(payload)) {
        console.log('No data found in response');
        return [];
      }

      const values = payload.map((item) => {
        return {
          title: item.text[titleIndex] || 'No Title',
          image: item.text[imageIndex] || 'No Image',
          commission: value.comisionrate,
          vip: value.vipId,
          amount: this.generateRandomPrice(value.min, value.max)
        };
      });

      return values;
    } catch (error) {
      console.error('Error fetching data from Kaggle:', error);
      throw error;
    }
  }


  private static generateRandomPrice(minStr: string, maxStr: string): string {
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    if (isNaN(min) || isNaN(max)) {
      return '0.00';
    }

    const randomPrice = (Math.random() * (max - min) + min).toFixed(2);
    return randomPrice;
  }
  // VIP 1 - Amazon Canada Products
  static async Vip1(value: any) {
    const data = {
      verificationInfo: {
        datasetId: 3892743,
        databundleVersionId: 7739884
      },
      firestorePath: "FTFGzaZX82u89A2tMkJX/versions/AQr8CIhNOjHHDrZPl1l1/files/amz_ca_total_products_data_processed.csv",
      tableQuery: {
        skip: 0,
        take: 1000,
        filter: { constantFilter: { value: true } },
        selectedColumns: [],
        sorts: []
      }
    };

    return await ProductRepository.fetchKaggleData(data, value, 1, 2);
  }

  // VIP 2 - Home and Kitchen
  static async Vip2(value: any) {
    const data = {
      verificationInfo: {
        datasetId: 3020336,
        databundleVersionId: 5312147
      },
      firestorePath: "xPzcStLbnsPzJKeYPOag/versions/DCzIM1E87eQwV2sueUk6/files/All Home and Kitchen.csv",
      tableQuery: {
        skip: 0,
        take: 1000,
        filter: { constantFilter: { value: true } },
        selectedColumns: [],
        sorts: []
      }
    };
    return await ProductRepository.fetchKaggleData(data, value, 0, 3);


  }

  // VIP 3 - Car Parts
  static async Vip3(value: any) {
    const data = {
      verificationInfo: {
        datasetId: 3020336,
        databundleVersionId: 5312147
      },
      firestorePath: "xPzcStLbnsPzJKeYPOag/versions/DCzIM1E87eQwV2sueUk6/files/Car Parts.csv",
      tableQuery: {
        skip: 0,
        take: 1000,
        filter: { constantFilter: { value: true } },
        selectedColumns: [],
        sorts: []
      }
    };

    return await ProductRepository.fetchKaggleData(data, value, 0, 3);

  }

  // VIP 4 - Air Conditioners
  static async Vip4(value: any) {
    const data = {
      verificationInfo: {
        datasetId: 3020336,
        databundleVersionId: 5312147
      },
      firestorePath: "xPzcStLbnsPzJKeYPOag/versions/DCzIM1E87eQwV2sueUk6/files/Air Conditioners.csv",
      tableQuery: {
        skip: 0,
        take: 1000,
        filter: { constantFilter: { value: true } },
        selectedColumns: [],
        sorts: []
      }
    };

    return await ProductRepository.fetchKaggleData(data, value, 0, 3);

  }

  // VIP 5 - Grocery and Gourmet Foods
  static async Vip5(value: any) {
    const data = {
      verificationInfo: {
        datasetId: 3020336,
        databundleVersionId: 5312147
      },
      firestorePath: "xPzcStLbnsPzJKeYPOag/versions/DCzIM1E87eQwV2sueUk6/files/All Grocery and Gourmet Foods.csv",
      tableQuery: {
        skip: 0,
        take: 1000,
        filter: { constantFilter: { value: true } },
        selectedColumns: [],
        sorts: []
      }
    };

    return await ProductRepository.fetchKaggleData(data, value, 0, 3);

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



  static async findAllAutocompleteProduct(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
      {
        // Filter by type: either "combo" OR "prizes"
        type: {
          $in: ["combo", "prizes"]
        }
      }
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            title: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("title_ASC");
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
      throw new Error400(options.language, "validation.requiredSubscription");
    }

    const pendingRecords = await Records(options.database).find({
      user: currentUser.id,
      status: 'pending'
    });

    if (pendingRecords.length > 0) {
      throw new Error400(options.language, "validation.submitPendingProducts");
    }

    const dailyOrder = currentUser.vip.dailyorder;

    if (currentUser.tasksDone >= dailyOrder) {
      throw new Error400(options.language, "validation.moretasks");
    }

    if (currentUser.balance <= 0 || currentUser.balance < currentUser.minbalance) {
      throw new Error400(options.language, "validation.deposit");
    }

    // Check for mergeData product
    if (currentUser && currentUser.product && currentUser.product.length > 0 && currentUser.product[0].id && currentUser.tasksDone === (mergeDataPosition - 1)) {
      let prodcut = currentUser.product[0];
      prodcut.photo = await FileRepository.fillDownloadUrl(prodcut?.photo);
      return prodcut;
    }
    // Check for prize product
    else if (currentUser && currentUser.prizes && currentUser.prizes.id && currentUser.tasksDone === (giftPosition - 1)) {
      let prodcut = currentUser.prizes;
      prodcut.photo = await FileRepository.fillDownloadUrl(prodcut?.photo);
      return prodcut;
    }
    // Normal product selection
    else {
      // Calculate price
      const vipMinPercentage = parseFloat(currentUser.vip.min) || 20;
      const vipMaxPercentage = parseFloat(currentUser.vip.max) || 50;
      const minPercent = Math.min(vipMinPercentage, vipMaxPercentage);
      const maxPercent = Math.max(vipMinPercentage, vipMaxPercentage);
      const randomPercentage = Math.random() * (maxPercent - minPercent) + minPercent;
      const calculatedPrice = (currentUser.balance * randomPercentage) / 100;
      const finalPrice = Math.round(calculatedPrice * 100) / 100;

      // Additional check: Ensure finalPrice doesn't exceed current balance
      if (finalPrice > currentUser.balance) {
        throw new Error400(options.language, "validation.insufficientBalance");
      }

      // Get random normal product
      let products = await Product(options.database)
        .find({ vip: currentVip, type: 'normal' })
        .populate("vip");

      if (products.length === 0) {
        throw new Error400(options.language, "validation.noProductsAvailable");
      }

      const randomIndex = Math.floor(Math.random() * products.length);
      const selectedProduct = products[randomIndex];

      // Generate record number
      const today = new Date();
      const datePart = today.getFullYear().toString() +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        today.getDate().toString().padStart(2, '0');
      const randomPart = Math.random().toString(36).substr(2, 8);
      const recordNumber = datePart + randomPart;

      // Get current tenant
      const currentTenant = MongooseRepository.getCurrentTenant(options);

      // Prepare record data - ALL fields that are in Record model

      const recordData = {
        number: recordNumber,
        product: selectedProduct.id,
        price: finalPrice.toString(),
        commission:selectedProduct?.commission,
        status: 'pending',
        user: currentUser.id,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        date: Dates.getDate(),
        datecreation: Dates.getTimeZoneDate(),
      };


      let createdRecord;
      
      try {
        // Method 1: Using the Records model function (if it exists)
        const [record] = await Records(options.database).create(
          [recordData],
          options
        );
        createdRecord = record;
        console.log('Record saved successfully with Records:', record.id);
      } catch (error) {
        console.log('Trying alternative method...');

        // Method 2: Direct model access
        const RecordModel = options.database.model('records');
        createdRecord = await RecordModel.create(recordData);
        console.log('Record saved successfully with direct model:', createdRecord.id);
      }

      // Update user balance and freeze balance
      try {
        const UserModel = options.database.model('user');
        
        // Use atomic operation to ensure consistency
        const updateResult = await UserModel.findByIdAndUpdate(
          currentUser.id,
          {
            $inc: {
              balance: -finalPrice,  // Deduct from balance
              freezeblance: finalPrice  // Add to freeze balance
            }
          },
          { new: true }  // Return the updated document
        );

        console.log('User balance updated:', {
          userId: currentUser.id,
          previousBalance: currentUser.balance,
          newBalance: updateResult.balance,
          previousFreezeBalance: currentUser.freezeblance,
          newFreezeBalance: updateResult.freezeblance,
          amountDeducted: finalPrice
        });

      } catch (balanceUpdateError) {
        console.error('Failed to update user balance:', balanceUpdateError);
        // If balance update fails, you might want to delete the created record
        // or handle the error appropriately
        throw new Error400(options.language, "validation.balanceUpdateFailed");
      }

      // Update product for return
      selectedProduct.amount = finalPrice.toString();
      selectedProduct.photo = await FileRepository.fillDownloadUrl(selectedProduct?.photo);

      return selectedProduct;
    }
  }



}

export default ProductRepository;
