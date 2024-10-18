import Users from "../services/users.service";

class UsersController {
  static async create(req, res, next) {
    try {
      const data = await Users.create();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async getPersonalData(req, res, next) {
    try {
      const data = await Users.getPersonalData();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
