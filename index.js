import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import farmRoutes from "./routes/farm.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ success: false, status, message });
});

// Connect and start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
