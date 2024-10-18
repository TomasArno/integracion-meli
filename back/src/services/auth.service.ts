class AuthService {
  static async login() {
    try {
      const { APP_ID, REDIRECT_URI } = process.env;

      return {
        url: `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}`,
      };
    } catch (error) {
      return error;
    }
  }

  static async meli(query) {
    try {
      const { code } = query;
      const { APP_ID, SECRET_KEY, REDIRECT_URI } = process.env;

      const body = {
        grant_type: "authorization_code",
        client_id: APP_ID,
        client_secret: SECRET_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      };

      const response = await fetch("https://api.mercadolibre.com/oauth/token", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default AuthService;
