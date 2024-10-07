import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { ACCESS_TOKEN } = process.env;

  const body = {
    grant_type: "authorization_code",
  };

  const response = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  res.status(200).json(data);
});

export default router;
