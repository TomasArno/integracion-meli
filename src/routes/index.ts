import { Router } from "express";

import auth from "./auth.route";
import sales from "./sales.route";
import users from "./users.route";

const router = Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/sales", sales);

export default router;
