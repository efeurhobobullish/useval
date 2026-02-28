import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createFundingRequest,
  approveFunding,
  rejectFunding,
} from "../controllers/wallet.js";

const walletRouter = Router();

/* USER */
walletRouter.post("/fund", authMiddleware, createFundingRequest);

/* WHATSAPP BUTTON ACTIONS */
walletRouter.patch("/approve/:id", approveFunding);
walletRouter.patch("/reject/:id", rejectFunding);

export default walletRouter;
