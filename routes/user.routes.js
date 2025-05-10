// --- routes/user.routes.js ---
import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});
export default router;
