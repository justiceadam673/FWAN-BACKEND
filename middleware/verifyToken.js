import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/createError.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated"));

  try {
    // Step 1: Decode the token to get user ID (no verification yet)
    const decoded = jwt.decode(token);
    if (!decoded?.id) return next(createError(403, "Invalid token"));

    // Step 2: Fetch the user's unique secret from the database
    const user = await User.findById(decoded.id);
    if (!user) return next(createError(404, "User not found"));

    // Step 3: Verify the token using the user's secret
    jwt.verify(token, user.jwtSecret, (err, verifiedUser) => {
      if (err) return next(createError(403, "Token is not valid"));
      req.user = verifiedUser; // Attach user data to the request
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const verifyRole = (role) => async (req, res, next) => {
  // First, verify the token and attach user data to `req.user`
  await verifyToken(req, res, () => {
    if (req.user?.role === role) {
      next(); // Role matches, proceed
    } else {
      return next(createError(403, `Only ${role}s can access this route`));
    }
  });
};
