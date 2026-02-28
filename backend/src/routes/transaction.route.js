import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  getMyTransactions,
  getMyTransactionById,
  getMyTransactionStats,
} from "../controllers/transaction.js";

const transactionRouter = Router();

/* USER ROUTES ONLY */

transactionRouter.get("/me", authMiddleware, getMyTransactions);
transactionRouter.get("/me/stats", authMiddleware, getMyTransactionStats);
transactionRouter.get("/me/:id", authMiddleware, getMyTransactionById);

export default transactionRouter;
