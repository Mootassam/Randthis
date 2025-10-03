import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import TransactionService from '../../services/transactionService';

export default async (req, res, next) => {
  try {


    const transactionStatus = req.body.data.status;
    const transactionId = req.body.data.id;

    const payload = await new TransactionService(req).updateTransactionStatus(transactionId, transactionStatus, req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
