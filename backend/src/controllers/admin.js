import mongoose from "mongoose";
import TransactionModel from "../models/transaction.js";
import UserModel from "../models/user.js";
import ValentineModel from "../models/valentine.js";
import { onError } from "../utils/onError.js";
import { approveFunding, rejectFunding } from "./wallet.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/* =========================
   GET DASHBOARD STATS
========================= */
export const getStats = async (req, res) => {
  try {
    const [usersCount, valentinesCount, transactionsCount, pendingDepositsCount] =
      await Promise.all([
        UserModel.countDocuments(),
        ValentineModel.countDocuments(),
        TransactionModel.countDocuments({ status: "success" }),
        TransactionModel.countDocuments({ type: "credit", status: "pending" }),
      ]);

    res.json({
      success: true,
      stats: {
        users: usersCount,
        valentines: valentinesCount,
        transactions: transactionsCount,
        pendingDeposits: pendingDepositsCount,
      },
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   GET ALL USERS (admin)
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, Number(req.query.limit) || DEFAULT_LIMIT));

    const [users, total] = await Promise.all([
      UserModel.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      UserModel.countDocuments(),
    ]);

    res.json({
      success: true,
      users,
      total,
      page,
      limit,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   GET ALL VALENTINES (admin)
========================= */
export const getAllValentines = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, Number(req.query.limit) || DEFAULT_LIMIT));

    const [valentines, total] = await Promise.all([
      ValentineModel.find()
        .populate("sender", "fullName email phone")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ValentineModel.countDocuments(),
    ]);

    res.json({
      success: true,
      valentines,
      total,
      page,
      limit,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   GET ALL TRANSACTIONS (admin)
========================= */
export const getAllTransactions = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, Number(req.query.limit) || DEFAULT_LIMIT));
    const { status, type } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const [transactions, total] = await Promise.all([
      TransactionModel.find(query)
        .populate("user", "fullName email phone")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      TransactionModel.countDocuments(query),
    ]);

    res.json({
      success: true,
      transactions,
      total,
      page,
      limit,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   GET PENDING DEPOSITS (funding requests)
========================= */
export const getPendingDeposits = async (req, res) => {
  try {
    const deposits = await TransactionModel.find({
      type: "credit",
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .populate("user", "fullName email phone wallet")
      .lean();

    res.json({
      success: true,
      deposits,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   APPROVE DEPOSIT (admin)
========================= */
export const approveDeposit = async (req, res) => {
  req.params.id = req.params.depositId;
  return approveFunding(req, res);
};

/* =========================
   REJECT DEPOSIT (admin)
========================= */
export const rejectDeposit = async (req, res) => {
  req.params.id = req.params.depositId;
  return rejectFunding(req, res);
};
