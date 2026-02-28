import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  buyAirtime,
  getMyAirtime,
  getAllAirtime,
} from "../controllers/airtime.js";

const airtimeRouter = Router();

/* USER */
airtimeRouter.post("/buy", authMiddleware, buyAirtime);
airtimeRouter.get("/me", authMiddleware, getMyAirtime);

/* ADMIN */
airtimeRouter.get("/admin", adminMiddleware, getAllAirtime);

export default airtimeRouter;
