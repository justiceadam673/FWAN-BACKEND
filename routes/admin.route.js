import express from "express";
import { verifyRole } from "../middleware/verifyToken.js";

const router = express.Router();

// Admin-only route (requires JWT + "admin" role)
router.get("/dashboard", verifyRole("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
