import { Router } from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  getStats,
  getPendingDeposits,
  approveDeposit,
  rejectDeposit,
  getAllUsers,
  getAllValentines,
  getAllTransactions,
} from "../controllers/admin.js";

const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.get("/stats", getStats);
adminRouter.get("/deposits", getPendingDeposits);
adminRouter.patch("/deposits/:depositId/approve", approveDeposit);
adminRouter.patch("/deposits/:depositId/reject", rejectDeposit);
adminRouter.get("/users", getAllUsers);
adminRouter.get("/valentines", getAllValentines);
adminRouter.get("/transactions", getAllTransactions);

export default adminRouter;
