import Sales from "../services/sales.service";

class SalesController {
  static async getAll(req, res, next) {
    try {
      const data = await Sales.getAll(req.query);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default SalesController;
