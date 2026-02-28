import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import "./cron/expireValentines.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import transactionRouter from "./routes/transaction.route.js";
import airtimeRouter from "./routes/airtime.route.js";
import valentineRouter from "./routes/valentine.route.js";
import walletRouter from "./routes/wallet.route.js";
import adminRouter from "./routes/admin.route.js";


const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   CORS (ORIGINAL)
========================= */
const allowedOrigins = [
  "https://useval-3929a2f721ab.herokuapp.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:3001",
  "https://useval.pxxl.click",
  "https://admin-useval.pxxl.click",
  "https://usevaltine.vercel.app",
  "https://val.empiretech.net.ng",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

/* =========================
   HEALTH
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Useval API running",
  });
});

app.get("/ping", (req, res) => {
  res.status(200).send("ok");
});

/* =========================
   ROUTES
========================= */
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/transactions", transactionRouter);
app.use("/v1/airtime", airtimeRouter);
app.use("/v1/valentine", valentineRouter);
app.use("/v1/wallet", walletRouter);
app.use("/v1/admin", adminRouter);

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Useval API running on port ${PORT}`);
});
