class SalesController {
  static async getAll(req, res, next) {
    try {
      const { ACCESS_TOKEN } = process.env;
      // const { sellerId } = req.query;

      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const date = {
        from: "2024-10-01T00:00:00.000-00:00",
        to: "2024-10-31T00:00:00.000-00:00",
      };

      const response = await fetch(
        `https://api.mercadolibre.com/orders/search?seller=${2021489598}&order.date_created.from=${
          date.from
        }&order.date_created.to=${date.to}`,
        {
          headers,
        }
      );

      const data = await response.json();

      if (data.status) {
        throw new Error("Permiso denegado");
      }

      const orders_info = data.results[0];

      const products = orders_info.order_items.map((item) => {
        return {
          title: item.item.title,
          quantity: item.quantity,
          status: item.status_detail,
          unitPrice: item.unit_price,
          total: item.full_unit_price,
          sku: item.item.seller_sku,
        };
      });

      const buyerId = orders_info.buyer.id;
      const status = orders_info.status;

      const { total_amount: total, date_created: dateCreated } =
        orders_info.order_items;

      res
        .status(200)
        .json({ data: { products, buyerId, total, status, dateCreated } });
    } catch (error) {
      return error;
    }
  }
}

export default SalesController;
