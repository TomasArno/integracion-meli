import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { ACCESS_TOKEN } = process.env;
  const { sellerId } = req.query;

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const date = {
    from: "2024-10-01T00:00:00.000-00:00",
    to: "2024-10-31T00:00:00.000-00:00",
  };

  const response = await fetch(
    `https://api.mercadolibre.com/orders/search?seller=${sellerId}&order.date_created.from=${date.from}&order.date_created.to=${date.to}`,
    {
      headers,
    }
  );

  const data = await response.json();

  res.status(200).json({ data: data.results });
});

export default router;
