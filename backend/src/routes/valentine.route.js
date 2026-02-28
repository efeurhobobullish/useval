import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createValentine,
  acceptValentine,
  getMyValentines,
  getMyValentineStats,
  getValentineByReference,
} from "../controllers/valentine.js";

const valentineRouter = Router();

/* USER */
valentineRouter.post("/", authMiddleware, createValentine);
valentineRouter.get("/me", authMiddleware, getMyValentines);
valentineRouter.get("/me/stats", authMiddleware, getMyValentineStats);

/* PUBLIC */
valentineRouter.get("/view/:reference", getValentineByReference);
valentineRouter.post("/accept/:reference", acceptValentine);

export default valentineRouter;
