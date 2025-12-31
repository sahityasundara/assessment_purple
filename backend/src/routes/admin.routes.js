import express from "express";
import User from "../models/User.js";
import { auth, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * GET all users with pagination (admin only)
 */
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * Activate user
 */
router.patch("/users/:id/activate", auth, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "active" });
    res.json({ message: "User activated successfully" });
  } catch {
    res.status(500).json({ message: "Failed to activate user" });
  }
});

/**
 * Deactivate user
 */
router.patch("/users/:id/deactivate", auth, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "inactive" });
    res.json({ message: "User deactivated successfully" });
  } catch {
    res.status(500).json({ message: "Failed to deactivate user" });
  }
});

export default router;
