// --- controllers/auth.controller.js ---
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, number, password, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userJwtSecret = crypto.randomBytes(64).toString("hex");
    const newUser = new User({
      name,
      email,
      number,
      password: hash,
      role,
      jwtSecret: userJwtSecret,
    });
    await newUser.save();
    res.status(201).json("User registered successfully");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong password"));

    const token = jwt.sign({ id: user._id, role: user.role }, user.jwtSecret, {
      expiresIn: "1h",
    });

    const { password, jwtSecret, ...info } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .json(info);
  } catch (err) {
    next(err);
  }
};
