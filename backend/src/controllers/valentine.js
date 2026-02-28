import crypto from "crypto";  
import mongoose from "mongoose";  
import ValentineModel from "../models/valentine.js";  
import UserModel from "../models/user.js";  
import TransactionModel from "../models/transaction.js";  
import AirtimeModel from "../models/airtime.js";  
import { vtunaijaApi } from "../config/vtunaijaApi.js";  
import { onError } from "../utils/onError.js";  
import generateValentineReference from "../utils/generateValentineReference.js";  
  
/* =========================  
   NETWORK MAP  
========================= */  
  
const networkMap = {  
  mtn: "1",  
  glo: "2",  
  "9mobile": "3",  
  airtel: "4",  
};  
  
/* =========================  
   CREATE VALENTINE  
========================= */  
  
export const createValentine = async (req, res) => {  
  const {  
    recipientName,  
    pickupLine,  
    thankYouMessage,  
    sendAirtime,  
    amount,  
  } = req.body;  
  
  try {  
    if (!recipientName || recipientName.trim().length < 2) {  
      return res.status(400).json({  
        success: false,  
        message: "Recipient name is required",  
      });  
    }  
  
    const user = await UserModel.findById(req.user.id);  
  
    if (!user || user.isBlocked) {  
      return res.status(403).json({  
        success: false,  
        message: "Account restricted",  
      });  
    }  
  
    if (!user.isVerified) {  
      return res.status(403).json({  
        success: false,  
        message: "Verify your account first",  
      });  
    }  
  
    const reference = await generateValentineReference(recipientName);  
  
    let transaction = null;  
    let airtimeAmount = 0;  
  
    if (sendAirtime === true) {  
      if (!amount || typeof amount !== "number" || amount <= 0) {  
        return res.status(400).json({  
          success: false,  
          message: "Valid airtime amount required",  
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
  
      transaction = await TransactionModel.create({  
        user: user.id,  
        type: "debit",  
        amount,  
        oldBalance,  
        newBalance,  
        reference,  
        description: `Valentine airtime for ${recipientName}`,  
        source: "valentine",  
        status: "pending",  
      });  
  
      user.wallet = newBalance;  
      await user.save();  
  
      airtimeAmount = amount;  
    }  
  
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  
  
    const valentine = await ValentineModel.create({  
      sender: user.id,  
      reference,  
      loversName: recipientName.trim(),  
      pickupLine: pickupLine?.trim() || null,  
      thankYouMessage: thankYouMessage?.trim() || null,  
      sendAirtime: !!sendAirtime,  
      airtimeAmount,  
      transaction: transaction ? transaction._id : null,  
      status: "pending",  
      expiresAt,  
    });  
  
    res.status(201).json({  
      success: true,  
      valentine,  
    });  
  } catch (error) {  
    onError(res, error);  
  }  
};  
  
/* =========================  
   PUBLIC VIEW  
========================= */  
  
export const getValentineByReference = async (req, res) => {  
  try {  
    const { reference } = req.params;  
  
    const valentine = await ValentineModel.findOne({ reference })  
      .populate("sender", "fullName");  
  
    if (!valentine) {  
      return res.status(404).json({  
        success: false,  
        message: "Valentine not found",  
      });  
    }  
  
    if (valentine.expiresAt < new Date()) {  
      valentine.status = "expired";  
      await valentine.save();  
    }  
  
    res.json({  
      success: true,  
      valentine,  
    });  
  } catch (error) {  
    onError(res, error);  
  }  
};  
  
/* =========================  
   ACCEPT VALENTINE  
========================= */  
  
export const acceptValentine = async (req, res) => {  
  const { reference } = req.params;  
  const { phone, network } = req.body;  
  
  try {  
    const valentine = await ValentineModel.findOne({ reference });  
  
    if (!valentine) {  
      return res.status(404).json({  
        success: false,  
        message: "Valentine not found",  
      });  
    }  
  
    if (valentine.expiresAt < new Date()) {  
      valentine.status = "expired";  
      await valentine.save();  
      return res.status(400).json({  
        success: false,  
        message: "Valentine expired",  
      });  
    }  
  
    if (valentine.status !== "pending") {  
      return res.status(400).json({  
        success: false,  
        message: "Valentine not available",  
      });  
    }  
  
    if (!valentine.sendAirtime) {  
      valentine.status = "accepted";  
      valentine.acceptedAt = new Date();  
      await valentine.save();  
  
      return res.json({  
        success: true,  
        message: "Valentine accepted",  
      });  
    }  
  
    if (!phone || !network) {  
      return res.status(400).json({  
        success: false,  
        message: "Phone and network required",  
      });  
    }  
  
    if (!["1", "2", "3", "4"].includes(network)) {  
      return res.status(400).json({  
        success: false,  
        message: "Invalid network selected",  
      });  
    }  
  
    const transaction = await TransactionModel.findById(valentine.transaction);  
  
    if (!transaction) {  
      return res.status(400).json({  
        success: false,  
        message: "Transaction not found",  
      });  
    }  
  
    const response = await vtunaijaApi.post("/topup/", {  
      network,  
      mobile_number: phone,  
      Ported_number: "true",  
      "request-id": valentine.reference,  
      amount: String(valentine.airtimeAmount),  
      airtime_type: "VTU",  
    });  
  
    console.log("VTU RESPONSE:", response.data);  
  
    const isSuccess =  
      response.data?.status === "success" &&  
      response.data?.Status === "successful";  
  
    if (!isSuccess) {  
      transaction.status = "failed";  
      await transaction.save();  
  
      const sender = await UserModel.findById(valentine.sender);  
      sender.wallet += valentine.airtimeAmount;  
      await sender.save();  
  
      return res.status(400).json({  
        success: false,  
        message: response.data?.api_response || "Airtime failed. Sender refunded",  
      });  
    }  
  
    transaction.status = "success";  
    await transaction.save();  
  
    await AirtimeModel.create({  
  user: valentine.sender,  
  valentine: valentine._id,  
  transaction: transaction._id,  
  reference: valentine.reference,  
  network,  
  phone,  
  amount: valentine.airtimeAmount,  
  source: "valentine",  
  status: "success",  
});  
  
    valentine.status = "accepted";  
    valentine.acceptedAt = new Date();  
    await valentine.save();  
  
    return res.json({  
      success: true,  
      message: "Valentine accepted",  
    });  
  
  } catch (error) {  
    console.error("ACCEPT ERROR:", error.message);  
    onError(res, error);  
  }  
};  
  
/* =========================  
   USER VALENTINES  
========================= */  
  
export const getMyValentines = async (req, res) => {  
  try {  
    const valentines = await ValentineModel.find({  
      sender: req.user.id,  
    }).sort({ createdAt: -1 });  
  
    res.json({  
      success: true,  
      valentines,  
    });  
  } catch (error) {  
    onError(res, error);  
  }  
};  
  
export const getMyValentineStats = async (req, res) => {  
  try {  
    const stats = await ValentineModel.aggregate([  
      { $match: { sender: new mongoose.Types.ObjectId(req.user.id) } },  
      {  
        $group: {  
          _id: "$status",  
          count: { $sum: 1 },  
        },  
      },  
    ]);  
  
    let result = {  
      total: 0,  
      accepted: 0,  
      pending: 0,  
      expired: 0,  
    };  
  
    stats.forEach((item) => {  
      result.total += item.count;  
      result[item._id] = item.count;  
    });  
  
    res.json({  
      success: true,  
      stats: result,  
    });  
  } catch (error) {  
    onError(res, error);  
  }  
};
