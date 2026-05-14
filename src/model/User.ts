import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "ORGANIZER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);