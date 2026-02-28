import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getProfile);
userRouter.put("/update", authMiddleware, updateProfile);

export default userRouter;
