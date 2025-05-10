// --- routes/farm.routes.js ---
import express from "express";
import { createFarm, getMyFarm } from "../controllers/farm.controller.js";
import { verifyRole } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/create", verifyRole("farmer"), createFarm);
router.get("/myfarm", verifyRole("farmer"), getMyFarm);

export default router;
