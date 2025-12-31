import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    status: { type: String, default: "active" },
    lastLogin: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);