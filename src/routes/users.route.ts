import { Router } from "express";

import Users from "../controllers/users.controller";

const router = Router();

router.post("/", Users.create);
router.get("/me", Users.getPersonalData);

export default router;
