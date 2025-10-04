
import ApiResponseHandler from '../apiResponseHandler';
import NotificationService from '../../services/notificationService';

export default async (req, res, next) => {
  try {

    const payload = await new NotificationService(
      req,
    ).countUnreadByUser(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
