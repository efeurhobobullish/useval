import { Schema, model, Types } from "mongoose";

const valentineSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    loversName: {
      type: String,
      required: true,
      trim: true,
    },

    pickupLine: {
      type: String,
      default: null,
      trim: true,
    },

    thankYouMessage: {
      type: String,
      default: null,
      trim: true,
    },

    sendAirtime: {
      type: Boolean,
      default: false,
    },

    airtimeAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    transaction: {
      type: Types.ObjectId,
      ref: "Transaction",
      default: null,
    },

    receiverPhone: {
      type: String,
      default: null,
    },

    network: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "expired"],
      default: "pending",
      index: true,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
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

const ValentineModel = model("Valentine", valentineSchema);

export default ValentineModel;
