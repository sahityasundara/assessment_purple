import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Get current user */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

/* Change password */
router.put("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password too weak" });
  }

  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
});
router.put("/profile", auth, async (req, res) => {
  const { fullName } = req.body;

  await User.findByIdAndUpdate(req.user.id, { fullName });
  res.json({ message: "Profile updated" });
});


export default router;
