import {
  getme,
  register,
  adminLogin,
  userLogin,
} from "../controllers/authController";
import { Router } from "express";
const router = Router();

router.get("/getme", getme);
router.post("/admin/login", adminLogin);
router.post("/user/login", userLogin);
router.post("/register", register);

export default router;
