import crypto from "crypto";
import AirtimeModel from "../models/airtime.js";
import UserModel from "../models/user.js";
import TransactionModel from "../models/transaction.js";
import { vtunaijaApi } from "../config/vtunaijaApi.js";
import { onError } from "../utils/onError.js";

export const buyAirtime = async (req, res) => {
  const { phone, network, amount } = req.body;

  try {
    if (!phone || !network || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.wallet < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance",
      });
    }

    const oldBalance = user.wallet;
    const newBalance = oldBalance - amount;
    const reference = crypto.randomBytes(8).toString("hex");

    const transaction = await TransactionModel.create({
      user: user.id,
      type: "debit",
      amount,
      oldBalance,
      newBalance,
      reference,
      description: "Airtime purchase",
      source: "airtime",
      status: "pending",
    });

    user.wallet = newBalance;
    await user.save();

    const airtime = await AirtimeModel.create({
      user: user.id,
      phone,
      network,
      amount,
      transaction: transaction.id,
      reference,
      source: "wallet",
    });

    try {
      const response = await vtunaijaApi.post("/airtime", {
        network,
        phone,
        amount,
        request_id: reference,
      });

      if (response.data?.status !== "success") {
        throw new Error("Airtime delivery failed");
      }

      transaction.status = "success";
      airtime.status = "success";

      await transaction.save();
      await airtime.save();
    } catch (apiError) {
      transaction.status = "failed";
      airtime.status = "failed";

      user.wallet = oldBalance;

      await user.save();
      await transaction.save();
      await airtime.save();

      return res.status(500).json({
        success: false,
        message: "Airtime failed. Wallet refunded",
      });
    }

    res.status(201).json({
      success: true,
      message: "Airtime sent successfully",
      airtime,
      wallet: user.wallet,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getMyAirtime = async (req, res) => {
  try {
    const airtime = await AirtimeModel.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      airtime,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getAllAirtime = async (req, res) => {
  try {
    const airtime = await AirtimeModel.find()
      .populate("user", "fullName phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      airtime,
    });
  } catch (error) {
    onError(res, error);
  }
};
