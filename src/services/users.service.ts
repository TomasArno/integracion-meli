class UsersService {
  static async create() {
    try {
      const { ACCESS_TOKEN } = process.env;

      const body = {
        site_id: "MLA",
      };

      const response = await fetch(
        "https://api.mercadolibre.com/users/test_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },

          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      return error;
    }
  }

  static async getPersonalData() {
    try {
      const { ACCESS_TOKEN } = process.env;

      const response = await fetch("https://api.mercadolibre.com/users/me", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await response.json();

      return { id: data.id };
    } catch (error) {
      return error;
    }
  }

  static async getById(userId: string | number) {
    try {
      const { ACCESS_TOKEN } = process.env;

      const response = await fetch(
        `https://api.mercadolibre.com/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      const data = await response.json();

      return { id: data.id };
    } catch (error) {
      return error;
    }
  }
}

export default UsersService;
