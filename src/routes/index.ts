import { Router } from "express";

import auth from "./auth.route";
import users from "./users.route";
import sales from "./sales.route";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/sales", sales);

export default router;
