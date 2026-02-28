import jwt from "jsonwebtoken";
import process from "process";
import UserModel from "../models/user.js";

const adminMiddleware = async (req, res, next) => {
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Admin authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const admin = await UserModel.findById(decoded.id);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized admin",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Admin session expired",
    });
  }
};

export default adminMiddleware;
