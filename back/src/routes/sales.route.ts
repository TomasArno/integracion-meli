import { Router } from "express";

import Sales from "../controllers/sales.controller";

const router = Router();

router.get("/", Sales.getAll);

export default router;
