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
class ProductRepository {

  private static baseConfig = {
    "cookie": "ka_sessionid=fb8ba94b3d36836866047fb80894f053; _ga=GA1.1.199781079.1760524055; ACCEPTED_COOKIES=true; CSRF-TOKEN=CfDJ8IaGWDgvvrBFtGGva9hUIY4kvXUOvqeD0gwSDfor3RFWPp9te_pY-oW0ilh7HWxUw452GJUHOhUz8nlcAcdbiTOhHDgK2U4KFS1ptuFefw; GCLB=CIzn3_P97cmejAEQAw; build-hash=29506ea853cc6a3a542f130dec2b4a40863d7254; searchToken=5849ba31-873f-4e4e-a179-e47a19fa8c64; XSRF-TOKEN=CfDJ8IaGWDgvvrBFtGGva9hUIY4Yi-euRhcXJbAy-5hTpeAZxxGBEkUciAJrB_IOBGlc-4syCmaF8PjGGUiXRiITLqNvwyKvAZvi1gUwJfZ0vkoSAg; CLIENT-TOKEN=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJrYWdnbGUiLCJhdWQiOiJjbGllbnQiLCJzdWIiOiIiLCJuYnQiOiIyMDI1LTEwLTIxVDE0OjI5OjA2LjI3MjY2MjdaIiwiaWF0IjoiMjAyNS0xMC0yMVQxNDoyOTowNi4yNzI2NjI3WiIsImp0aSI6IjRkYTVlNmZhLTQ1MjYtNGFhMi1iZTdhLWYxZmQzNDk5YjI3OCIsImV4cCI6IjIwMjUtMTEtMjFUMTQ6Mjk6MDYuMjcyNjYyN1oiLCJhbm9uIjp0cnVlLCJmZiI6WyJLZXJuZWxzT3BlbkluQ29sYWJMb2NhbFVybCIsIk1ldGFzdG9yZUNoZWNrQWdncmVnYXRlRmlsZUhhc2hlcyIsIlVzZXJMaWNlbnNlQWdyZWVtZW50U3RhbGVuZXNzVHJhY2tpbmciLCJLZXJuZWxzUGF5VG9TY2FsZSIsIkJlbmNobWFya091dHB1dEltcHJvdmVtZW50cyIsIkhhY2thdGhvbkRlbGV0ZVdyaXRldXBzIiwiRmVhdHVyZWRNb2RlbHNTaGVsZiIsIkRhdGFzZXRQb2xhcnNEYXRhTG9hZGVyIiwiS2VybmVsc1NldHRpbmdzVGFiIiwiS2VybmVsc0ZpcmViYXNlTG9uZ1BvbGxpbmciLCJGcm9udGVuZEVycm9yUmVwb3J0aW5nIiwiQWxsb3dGb3J1bUF0dGFjaG1lbnRzIiwiVGVybXNPZlNlcnZpY2VCYW5uZXIiLCJEYXRhc2V0VXBsb2FkZXJEdXBsaWNhdGVEZXRlY3Rpb24iXSwiZmZkIjp7Ik1vZGVsSWRzQWxsb3dJbmZlcmVuY2UiOiIiLCJNb2RlbEluZmVyZW5jZVBhcmFtZXRlcnMiOiJ7IFwibWF4X3Rva2Vuc1wiOiAxMjgsIFwidGVtcGVyYXR1cmVcIjogMC40LCBcInRvcF9rXCI6IDUgfSIsIlNwb3RsaWdodENvbW11bml0eUNvbXBldGl0aW9uIjoiMTA1ODc0LDEwMTAzOSwxMTMxNTUsMTAzNDMyLDExMzY2NCIsIkZlYXR1cmVkQmVuY2htYXJrcyI6IjEzNywxNiwxNDcsMTM0IiwiR2V0dGluZ1N0YXJ0ZWRDb21wZXRpdGlvbnMiOiIzMTM2LDU0MDcsODY1MTgsMzQzNzciLCJTdHNNaW5GaWxlcyI6IjEwMDAwMCIsIlN0c01pbkdiIjoiMSIsIlBlcnNvbmFsQmVuY2htYXJrc1ByaW9yaXR5VGFza0lkcyI6IjEwNiwyMjksMTA1LDIyNywxMTAsMjI4LDExNiwyMzAsMTczLDIzMiwxNzUsMjM5LDI2NCwyNDksMjQ3IiwiQ2xpZW50UnBjUmF0ZUxpbWl0UXBzIjoiNDAiLCJDbGllbnRScGNSYXRlTGltaXRRcG0iOiI1MDAiLCJBZGRGZWF0dXJlRmxhZ3NUb1BhZ2VMb2FkVGFnIjoiZGlzYWJsZWQiLCJLZXJuZWxFZGl0b3JBdXRvc2F2ZVRocm90dGxlTXMiOiIzMDAwMCIsIktlcm5lbHNMNEdwdUNvbXBzIjoiODYwMjMsODQ3OTUsODg5MjUsOTE0OTYiLCJFbmFibGVDZG5DYWNoZSI6IiIsIkh0dHBHZXRFbmFibGVkUnBjcyI6IiIsIkZlYXR1cmVkQ29tbXVuaXR5Q29tcGV0aXRpb25zIjoiNjAwOTUsNTQwMDAsNTcxNjMsODA4NzQsODE3ODYsODE3MDQsODI2MTEsODUyMTAiLCJFbWVyZ2VuY3lBbGVydEJhbm5lciI6IiIsIkNvbXBldGl0aW9uTWV0cmljVGltZW91dE1pbnV0ZXMiOiIzMCIsIkdhbWVBcmVuYUZlYXR1cmVkTGVhZGVyYm9hcmRCZW5jaG1hcmtWZXJzaW9ucyI6IjEyOSIsIkNkbkNhY2hlRGlzYWJsZWRScGNzIjoiIiwiRGF0YXNldHNTZW5kUGVuZGluZ1N1Z2dlc3Rpb25zUmVtaW5kZXJzQmF0Y2hTaXplIjoiMTAwIiwiR2FtZUFyZW5hQmVuY2htYXJrVmVyc2lvbnMiOiIxMjkiLCJLZXJuZWxzUGF5VG9TY2FsZVByb1BsdXNHcHVIb3VycyI6IjMwIiwiS2VybmVsc1BheVRvU2NhbGVQcm9HcHVIb3VycyI6IjE1IiwiRW1lcmdlbmN5QWxlcnRCYW5uZXJGb3JVc2VyUHJvZmlsZSI6IiJ9LCJwaWQiOiJrYWdnbGUtMTYxNjA3Iiwic3ZjIjoid2ViLWZlIiwic2RhayI6IkFJemFTeUE0ZU5xVWRSUnNrSnNDWldWei1xTDY1NVhhNUpFTXJlRSIsImJsZCI6IjI5NTA2ZWE4NTNjYzZhM2E1NDJmMTMwZGVjMmI0YTQwODYzZDcyNTQifQ.; _ga_T7QHS60L4Q=GS2.1.s1761056917$o2$g1$t1761056947$j30$l0$h0",
    "origin": "https://www.kaggle.com",
    "referer": "https://www.kaggle.com/datasets/asaniczka/amazon-canada-products-2023-2-1m-products",
    "x-kaggle-build-version": "29506ea853cc6a3a542f130dec2b4a40863d7254",
    "Content-Type": "application/json",
    "x-xsrf-token": "CfDJ8IaGWDgvvrBFtGGva9hUIY4Yi-euRhcXJbAy-5hTpeAZxxGBEkUciAJrB_IOBGlc-4syCmaF8PjGGUiXRiITLqNvwyKvAZvi1gUwJfZ0vkoSAg"
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

    if (currentUser && currentUser.product && currentUser.product.length > 0 && currentUser.product[0].id && currentUser.tasksDone === (mergeDataPosition - 1)) {
      let prodcut = currentUser.product[0];
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
