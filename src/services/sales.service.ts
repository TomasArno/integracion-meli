class SalesService {
  static async getAll(query) {
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

      const { status, date_created } = orders_info;
      const total = orders_info.order_items.total_amount;

      const billingInfo = await this.getBillingInfo(orders_info.id);

      return {
        products,
        buyerData: billingInfo,
        dateCreated: date_created,
        total,
        status,
      };
    } catch (error) {
      return error;
    }
  }

  static async getBillingInfo(orderId) {
    const { ACCESS_TOKEN } = process.env;

    if (!orderId) throw new Error("missing orderID");

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    const response = await fetch(
      `https://api.mercadolibre.com/orders/${orderId}/billing_info`,
      {
        headers,
      }
    );

    const data = await response.json();

    const { buyerId, additional_info } = data.billing_info;

    const taxData: any = {};

    const propsMap = {
      TAXPAYER_TYPE_ID: "ivaCondition",
      DOC_TYPE: "docType",
      DOC_NUMBER: "docNumber",
      FIRST_NAME: "firstName",
      LAST_NAME: "lastName",
      STATE_NAME: "state",
      CITY_NAME: "city",
      STREET_NAME: "street",
      ZIP_CODE: "zip",
    };

    additional_info.forEach((obj) => {
      const key = propsMap[obj.type];

      if (key) {
        taxData[key] = obj.value;
      }
    });

    return { ...taxData, buyerId };
  }
}

export default SalesService;
