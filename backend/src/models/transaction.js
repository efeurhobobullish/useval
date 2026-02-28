import { Schema, model, Types } from "mongoose";

const transactionSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["wallet_funding", "airtime_purchase", "valentine", "credit", "debit" ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    oldBalance: {
      type: Number,
      required: true,
    },

    newBalance: {
      type: Number,
      required: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const TransactionModel = model("Transaction", transactionSchema);

export default TransactionModel;