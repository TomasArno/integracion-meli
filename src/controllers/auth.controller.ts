class AuthController {
  static async login(req, res, next) {
    try {
      const { APP_ID, REDIRECT_URI } = process.env;

      res.status(200).json({
        url: `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}`,
      });
    } catch (error) {
      return error;
    }
  }

  static async meli(req, res, next) {
    try {
      const { code } = req.query;
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

      res.status(200).json({
        data,
      });
    } catch (error) {
      return error;
    }
  }
}

export default AuthController;
