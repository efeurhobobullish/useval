import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  register,
  requestOtp,
  resendOtp,
  verifyOtpAndLogin,
  checkAuth,
  logout,
  adminLogin,
  adminCheckAuth,
  adminLogout,
} from "../controllers/auth.js";

const authRouter = Router();

/* USER AUTH */
authRouter.post("/register", register);
authRouter.post("/otp/request", requestOtp);
authRouter.post("/otp/resend", resendOtp);
authRouter.post("/otp/verify", verifyOtpAndLogin);
authRouter.get("/check", authMiddleware, checkAuth);
authRouter.post("/logout", authMiddleware, logout);

/* ADMIN AUTH */
authRouter.post("/admin/login", adminLogin);
authRouter.get("/admin/check", adminMiddleware, adminCheckAuth);
authRouter.post("/admin/logout", adminMiddleware, adminLogout);

export default authRouter;
