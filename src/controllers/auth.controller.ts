import Auth from "../services/auth.service";

class AuthController {
  static async login(req, res, next) {
    try {
      const data = Auth.login();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async meli(req, res, next) {
    try {
      const data = await Auth.meli(req.query);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
