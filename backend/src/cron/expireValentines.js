import ValentineModel from "../models/valentine.js";
import UserModel from "../models/user.js";
import TransactionModel from "../models/transaction.js";

const ONE_DAY = 24 * 60 * 60 * 1000;

const expireValentines = async () => {
  try {
    const now = Date.now();

    const valentines = await ValentineModel.find({
      status: "pending",
      createdAt: { $lte: new Date(now - ONE_DAY) },
    });

    for (const valentine of valentines) {
      const transaction = await TransactionModel.findById(valentine.transaction);

      if (!transaction || transaction.status !== "pending") {
        continue;
      }

      const sender = await UserModel.findById(valentine.sender);

      if (sender) {
        sender.wallet += valentine.amount;
        await sender.save();
      }

      transaction.status = "failed";
      await transaction.save();

      valentine.status = "expired";
      await valentine.save();
    }
  } catch (error) {
    console.error("Valentine expiry cron failed");
    console.error(error.message);
  }
};

export default expireValentines;
