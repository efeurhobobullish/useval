import { Schema, model, Types } from "mongoose";

const airtimeSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    valentine: {
      type: Types.ObjectId,
      ref: "Valentine",
      required: true,
    },

    transaction: {
      type: Types.ObjectId,
      ref: "Transaction",
      required: true,
    },

    reference: {
      type: String,
      required: true,
    },

    network: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    source: {
      type: String,
      default: "valentine",
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
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

const AirtimeModel = model("Airtime", airtimeSchema);

export default AirtimeModel;
