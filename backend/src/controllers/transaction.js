import mongoose from "mongoose";
import crypto from "crypto";
import TransactionModel from "../models/transaction.js";
import { onError } from "../utils/onError.js";

/* =========================
   GET MY TRANSACTIONS
========================= */

export const getMyTransactions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { type, status } = req.query;

    const query = { user: req.user.id };

    if (type) query.type = type;
    if (status) query.status = status;

    const transactions = await TransactionModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TransactionModel.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      transactions,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   GET SINGLE TRANSACTION
========================= */

export const getMyTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction id",
      });
    }

    const transaction = await TransactionModel.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   GET MY TRANSACTION STATS
========================= */

export const getMyTransactionStats = async (req, res) => {
  try {
    const stats = await TransactionModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      credit: { totalAmount: 0, count: 0 },
      debit: { totalAmount: 0, count: 0 },
    };

    stats.forEach((item) => {
      result[item._id] = {
        totalAmount: item.totalAmount,
        count: item.count,
      };
    });

    res.status(200).json({
      success: true,
      stats: result,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   HELPER FUNCTION
========================= */

export const createTransaction = async ({
  user,
  type,
  amount,
  oldBalance,
  newBalance,
  description,
  source,
  status = "success",
}) => {
  return TransactionModel.create({
    user,
    type,
    amount,
    oldBalance,
    newBalance,
    description,
    source,
    status,
    reference: crypto.randomBytes(8).toString("hex"),
  });
};
