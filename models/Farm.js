// --- models/Farm.js ---
import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmName: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: String, required: true },
    products: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Farm", FarmSchema);
