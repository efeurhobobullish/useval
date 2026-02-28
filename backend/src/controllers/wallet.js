import crypto from "crypto";
import TransactionModel from "../models/transaction.js";
import UserModel from "../models/user.js";
import { onError } from "../utils/onError.js";
import sendEmail from "../utils/sendEmail.js";
import { deposit as depositEmail } from "../template/depositEmail.js";


/* =========================
   USER CREATE FUNDING REQUEST
========================= */

export const createFundingRequest = async (req, res) => {
  const { amount } = req.body;

  try {
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const transaction = await TransactionModel.create({
      user: user.id,
      type: "credit",
      amount,
      oldBalance: user.wallet,
      newBalance: user.wallet,
      reference: crypto.randomBytes(8).toString("hex"),
      description: "Wallet funding request",
      source: "wallet",
      status: "pending",
    });

    const currentBalance = user.wallet || 0;
    const afterApproval = currentBalance + transaction.amount;

    /* SEND EMAIL TO ADMIN */
    await sendEmail({
      to: "efeurhobobullish@gmail.com",
      name: "Useval Admin",
      subject: "New Wallet Funding Request",
      html: depositEmail({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        currentBalance,
        amount: transaction.amount,
        afterApproval,
        reference: transaction.reference,
      }),
    });

    res.status(201).json({
      success: true,
      message: "Funding request submitted",
    });

  } catch (error) {
    onError(res, error);
  }
};



/* =========================
   APPROVE FUNDING
========================= */

export const approveFunding = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);

    if (!transaction || transaction.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Funding not available",
      });
    }

    const user = await UserModel.findById(transaction.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const oldBalance = user.wallet;
    const newBalance = oldBalance + transaction.amount;

    user.wallet = newBalance;
    await user.save();

    transaction.oldBalance = oldBalance;
    transaction.newBalance = newBalance;
    transaction.status = "success";
    await transaction.save();

    res.json({
      success: true,
      message: "Funding approved successfully",
    });

  } catch (error) {
    onError(res, error);
  }
};



/* =========================
   REJECT FUNDING
========================= */

export const rejectFunding = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);

    if (!transaction || transaction.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Funding not available",
      });
    }

    transaction.status = "failed";
    await transaction.save();

    res.json({
      success: true,
      message: "Funding rejected",
    });

  } catch (error) {
    onError(res, error);
  }
};