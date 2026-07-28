import ApiResponseHandler from '../apiResponseHandler';
import CompanyService from '../../services/companyService';

export default async (req, res, next) => {
  try {
    const tc = await new CompanyService(req).findPublicTc();

    await ApiResponseHandler.success(req, res, { tc });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
