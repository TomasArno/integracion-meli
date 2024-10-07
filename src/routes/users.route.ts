import { Router } from "express";

const router = Router();

router.post("/test", async (req, res) => {
  const { ACCESS_TOKEN } = process.env;

  const body = {
    site_id: "MLA",
  };

  const response = await fetch("https://api.mercadolibre.com/users/test_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },

    body: JSON.stringify(body),
  });

  const data = await response.json();

  res.status(200).json(data);
});

export default router;
