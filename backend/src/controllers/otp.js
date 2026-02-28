import OtpModel from "../models/otp.js";
import UserModel from "../models/user.js";
import { onError } from "../utils/onError.js";

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!global.whatsapp) {
      return res.status(503).json({
        success: false,
        message: "WhatsApp service unavailable",
      });
    }

    const user = await UserModel.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OtpModel.deleteMany({ phone });

    await OtpModel.create({
      phone,
      code,
      expiresAt,
    });

    await global.whatsapp.sendMessage(
      `${phone}@s.whatsapp.net`,
      { text: `Your Useval verification code is ${code}. Expires in 5 minutes.` }
    );

    res.status(200).json({
      success: true,
      message: "Verification code sent",
    });
  } catch (error) {
    onError(res, error);
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, code } = req.body;

  try {
    if (!phone || !code) {
      return res.status(400).json({
        success: false,
        message: "Phone and code are required",
      });
    }

    const otp = await OtpModel.findOne({
      phone,
      code,
      verified: false,
    });

    if (!otp || otp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }

    otp.verified = true;
    await otp.save();

    await UserModel.findOneAndUpdate(
      { phone },
      { isVerified: true }
    );

    res.status(200).json({
      success: true,
      message: "Phone verified successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};