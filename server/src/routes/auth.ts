import { Router, Request, Response } from "express";
import { User } from "../models/User.js";

const router = Router();

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Simplistic auth (no hashing for now as per mock setup, but ideally should use bcrypt)
    // Here we'll just check if the user exists and the password matches.
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set cookie
    res.cookie("anvi_user_id", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password, phone: phone || "" });
    await user.save();

    res.cookie("anvi_user_id", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Profile Update
router.patch("/profile", async (req: Request, res: Response) => {
  try {
    const userId = req.cookies.anvi_user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Session
router.get("/session", async (req: Request, res: Response) => {
  try {
    const userId = req.cookies.anvi_user_id;
    if (!userId) return res.status(401).json({ message: "No active session" });

    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie("anvi_user_id");
      return res.status(401).json({ message: "Invalid session" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("anvi_user_id");
  res.json({ message: "Logged out successfully" });
});

// Forgot Password
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // Dummy implementation. In a real app, generate a reset token and email it.
    // We intentionally return 200 even if the user is not found to prevent email enumeration.
    res.status(200).json({ message: "If an account exists, a reset link has been sent." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
