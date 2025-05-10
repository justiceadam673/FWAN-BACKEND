// --- models/User.js ---
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ["buyer", "farmer", "admin"], required: true },
    jwtSecret: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
