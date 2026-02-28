import UserModel from "../models/user.js";
import { onError } from "../utils/onError.js";

/* =========================
   GET MY PROFILE
========================= */

export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    onError(res, error);
  }
};

/* =========================
   UPDATE MY PROFILE
========================= */

export const updateProfile = async (req, res) => {
  const { fullName } = req.body;

  try {
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Valid full name is required",
      });
    }

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked",
      });
    }

    user.fullName = fullName.trim();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    onError(res, error);
  }
};
