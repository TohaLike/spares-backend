import { apiService } from "../services/api.service.js";

class ApiController {
  async auth(req, res, next) {
    try {
      const isAuth = await apiService.auth();

      res.cookie("refreshToken", isAuth.result.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({ token: isAuth.result.accessToken });
    } catch (e) {
      next(e);
    }
  }

  async getDetails(req, res, next) {
    try {
      const { code } = req.params;
      const { refreshToken } = req.cookies;

      const details = await apiService.getDetails(code, refreshToken);

      return res.json(details);
    } catch (e) {
      next(e);
    }
  }
}

export const apiController = new ApiController();
