import { Router } from "express";

const router = Router();

router.get("/login", async (req, res) => {
  const { APP_ID } = process.env;

  location.replace(
    `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${APP_ID}&redirect_uri=https://integracion-natural.onrender.com/auth/meli`
  );
});

router.get("/meli", async (req, res) => {
  const { code } = req.query;
  const { APP_ID, SECRET_KEY } = process.env;

  const body = {
    grant_type: "authorization_code",
    client_id: APP_ID,
    client_secret: SECRET_KEY,
    redirect_uri: "https://integracion-natural.onrender.com/auth/meli",
    code,
  };

  const response = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  res.status(200).json(data);
});

export default router;
