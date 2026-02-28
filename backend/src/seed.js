import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "./models/user.js";

const DEFAULT_ADMIN_EMAIL = "admin@useval.com";
const DEFAULT_ADMIN_PASSWORD = "Admin123!";
const DEFAULT_ADMIN_NAME = "Useval Admin";
const DEFAULT_ADMIN_PHONE = "00000000000";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!uri) {
    console.error("❌ MONGODB_URI or MONGODB_URL is required");
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log("✅ Database connected");
};

async function seed() {
  await connectDB();

  const existing = await UserModel.findOne({
    $or: [{ email: DEFAULT_ADMIN_EMAIL }, { phone: DEFAULT_ADMIN_PHONE }],
  }).select("+password");

  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);

  if (existing) {
    existing.fullName = DEFAULT_ADMIN_NAME;
    existing.email = DEFAULT_ADMIN_EMAIL;
    existing.phone = DEFAULT_ADMIN_PHONE;
    existing.password = hashedPassword;
    existing.isAdmin = true;
    existing.isVerified = true;
    await existing.save();
    console.log("✅ Admin user updated:", DEFAULT_ADMIN_EMAIL);
  } else {
    await UserModel.create({
      fullName: DEFAULT_ADMIN_NAME,
      email: DEFAULT_ADMIN_EMAIL,
      phone: DEFAULT_ADMIN_PHONE,
      password: hashedPassword,
      isAdmin: true,
      isVerified: true,
    });
    console.log("✅ Admin user created:", DEFAULT_ADMIN_EMAIL);
  }

  console.log("");
  console.log("   Email:", DEFAULT_ADMIN_EMAIL);
  console.log("   Password:", DEFAULT_ADMIN_PASSWORD);
  console.log("");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
