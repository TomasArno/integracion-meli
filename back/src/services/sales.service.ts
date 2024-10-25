import { parseQueryParam, removeFalsyProps } from "../utils/query.util";

class SalesService {
  private static async extractProductData(order: any) {
    try {
      const { ACCESS_TOKEN } = process.env;

      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };

      const productOrder = order.order_items[0];

      const response = await fetch(
        `https://api.mercadolibre.com/items/${productOrder.item.id}`,
        {
          headers,
        }
      );

      if (response.status == 401)
        throw new Error("Es necesario iniciar sesión");

      const data = await response.json();

      return {
        thumbnail: data.thumbnail,
        title: productOrder.item.title,
        sku: productOrder.item.seller_sku,
        quantity: productOrder.quantity,
        status: productOrder.status_detail,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAll(query) {
    try {
      const { ACCESS_TOKEN, SELLER_ID } = process.env;

      const queryParsed = parseQueryParam({ ...query, seller: SELLER_ID });

      const headers: any = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "x-format-new": true,
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
        const { id, status, total_amount, date_created, shipping_cost } = order;

        const productData = await this.extractProductData(order);
        const billingInfo = await this.getBillingInfo(order.id);

        return {
          id,
          productData: productData,
          buyerData: billingInfo,
          createdAt: date_created.split("T")[0],
          shippingCost: shipping_cost || 0,
          total: total_amount,
          status,
        };
      });

      return await Promise.all(compras);
    } catch (error) {
      throw error;
    }
  }

  static async getBillingInfo(orderId) {
    try {
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

      if (response.status == 204) return {};
      if (response.status == 401)
        throw new Error("Es necesario iniciar sesión");

      const data = await response.json();

      const { additional_info, doc_type, doc_number } = data.billing_info;

      const taxData: any = { docType: doc_type, docNumber: doc_number };

      const propsMap = {
        TAXPAYER_TYPE_ID: "ivaCondition",
        FIRST_NAME: "firstName",
        LAST_NAME: "lastName",
        STATE_NAME: "state",
        CITY_NAME: "city",
        STREET_NAME: "street",
        ZIP_CODE: "zip",
        BUSINESS_NAME: "businessName",
      };

      additional_info.forEach((obj) => {
        const key = propsMap[obj.type];

        if (key) {
          taxData[key] = obj.value;
        }
      });

      return removeFalsyProps(taxData);
    } catch (error) {
      throw error;
    }
  }
}

export default SalesService;
