import { parseQueryParam } from "../utils/query.util";

class SalesService {
  static async getAll(query) {
    try {
      const { ACCESS_TOKEN } = process.env;
      // const { sellerId } = req.query;
      const queryParsed = parseQueryParam(query);

      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const response = await fetch(
        `https://api.mercadolibre.com/orders/search` + queryParsed,
        {
          headers,
        }
      );

      const data = await response.json();

      if (data.status) {
        throw new Error(data.message);
      }

      const ordersInfo = data.results;

      const compras = await ordersInfo.map(async (order) => {
        const productData = order.order_items.map((item) => {
          return {
            title: item.item.title,
            quantity: item.quantity,
            status: item.status_detail,
            unitPrice: item.unit_price,
            total: item.full_unit_price,
            sku: item.item.seller_sku,
          };
        });

        const { id, status, total_amount, date_created, shipping_cost } = order;

        const billingInfo = await this.getBillingInfo(order.id);

        return {
          id,
          productData,
          buyerData: billingInfo,
          createdAt: date_created.split("T")[0],
          shippingCost: shipping_cost || 0,
          totalAmount: total_amount,
          status,
        };
      });

      return await Promise.all(compras);
    } catch (error) {
      throw error;
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
    // probar con header x-version:2'

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
