import ApiResponseHandler from '../apiResponseHandler';
import AuthService from '../../services/auth/authService';
import Error403 from '../../errors/Error403';
import Roles from '../../security/roles';

export default async (req, res, next) => {
  try {
    const isAdmin = Boolean(
      req.currentUser?.tenants?.some(
        (tenantUser) =>
          tenantUser.status === 'active' &&
          (tenantUser.roles || []).includes(Roles.values.admin),
      ),
    );

    if (!isAdmin) {
      throw new Error403(req.language);
    }

    const payload = await AuthService.resetPassword(
      req.body.userId,
      req.body.newPassword,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
