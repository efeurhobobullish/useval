import process from "process";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import OtpModel from "../models/otp.js";
import { onError } from "../utils/onError.js";
import { generateCodes } from "../utils/generateCodes.js";
import sendEmail from "../utils/sendEmail.js";

import { login as loginEmail } from "../template/loginEmail.js";
import { welcome as welcomeEmail } from "../template/welcomeEmail.js";



/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone and email are required",
      });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ phone }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await UserModel.create({
      fullName,
      phone,
      email,
      isVerified: false,
    });

    res.status(201).json({
      success: true,
      message: "Account created. Verification required",
      user,
    });

  } catch (error) {
    onError(res, error);
  }
};



/* =========================
   REQUEST OTP (EMAIL)
========================= */
export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const lastOtp = await OtpModel.findOne({ email })
      .sort({ createdAt: -1 });

    if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < 60_000) {
      return res.status(429).json({
        success: false,
        message: "Please wait before requesting another code",
      });
    }

    const code = generateCodes();
    const expiresAt = new Date(Date.now() + 5 * 60_000);

    await OtpModel.deleteMany({ email });

    await OtpModel.create({
      email,
      code,
      expiresAt,
      attempts: 0,
      lockedUntil: null,
    });

    res.json({
      success: true,
      message: "Verification code sent to email",
    });

    await sendEmail({
      to: user.email,
      name: user.fullName,
      subject: "Your Verification Code",
      html: loginEmail({
        name: user.fullName,
        code,
      }),
    });

  } catch (error) {
    onError(res, error);
  }
};



/* =========================
   RESEND OTP (EMAIL)
========================= */
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const lastOtp = await OtpModel.findOne({ email })
      .sort({ createdAt: -1 });

    if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < 120_000) {
      return res.status(429).json({
        success: false,
        message: "Please wait before resending code",
      });
    }

    const code = generateCodes();
    const expiresAt = new Date(Date.now() + 5 * 60_000);

    await OtpModel.deleteMany({ email });

    await OtpModel.create({
      email,
      code,
      expiresAt,
      attempts: 0,
      lockedUntil: null,
    });

    res.json({
      success: true,
      message: "New verification code sent",
    });

    const user = await UserModel.findOne({ email });

    await sendEmail({
      to: user.email,
      name: user.fullName,
      subject: "Your New Verification Code",
      html: loginEmail({
        name: user.fullName,
        code,
      }),
    });

  } catch (error) {
    onError(res, error);
  }
};



/* =========================
   VERIFY OTP + LOGIN
========================= */
export const verifyOtpAndLogin = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required",
      });
    }

    const otp = await OtpModel.findOne({ email });

    if (!otp || otp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }

    if (otp.code !== code) {
      otp.attempts += 1;
      await otp.save();

      return res.status(400).json({
        success: false,
        message: "Invalid code",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await otp.deleteOne();

    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
    });

    await sendEmail({
      to: user.email,
      name: user.fullName,
      subject: "Welcome to Useval",
      html: welcomeEmail({
        name: user.fullName,
      }),
    });

  } catch (error) {
    onError(res, error);
  }
};



/* =========================
   CHECK AUTH
========================= */
export const checkAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.json({
    success: true,
    user: req.user,
  });
};



/* =========================
   LOGOUT
========================= */
export const logout = async (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};


/* =========================
   ADMIN LOGIN (email + password → set admin_token cookie)
========================= */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or not an admin account",
      });
    }

    if (!user.password) {
      return res.status(403).json({
        success: false,
        message: "Admin account has no password set. Run seed or set password.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const adminUser = await UserModel.findById(user.id);
    res.json({
      success: true,
      admin: adminUser,
    });
  } catch (error) {
    onError(res, error);
  }
};


/* =========================
   ADMIN CHECK AUTH
========================= */
export const adminCheckAuth = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      message: "Admin authentication required",
    });
  }
  res.json({
    success: true,
    admin: req.admin,
  });
};


/* =========================
   ADMIN LOGOUT
========================= */
export const adminLogout = async (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
