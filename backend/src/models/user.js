import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String,
      default: function () {
        const name = this.fullName || "User";
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`;
      },
    },

    wallet: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    /* Optional: for admin login (email + password) */
    password: {
      type: String,
      select: false,
      default: null,
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

const UserModel = model("User", userSchema);

export default UserModel;