import { register, login, getme } from "../controllers/auth";
import { Router } from "express";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getme", getme);

export default router;
