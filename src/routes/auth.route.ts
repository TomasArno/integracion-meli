import { Router } from "express";
import Auth from "../controllers/auth.controller";

const router = Router();

router.get("/login", Auth.login);
router.get("/meli", Auth.meli);

export default router;
