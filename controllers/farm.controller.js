// --- controllers/farm.controller.js ---
import Farm from "../models/Farm.js";

export const createFarm = async (req, res, next) => {
  try {
    const newFarm = new Farm({ ...req.body, userId: req.user.id });
    await newFarm.save();
    res.status(201).json(newFarm);
  } catch (err) {
    next(err);
  }
};

export const getMyFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findOne({ userId: req.user.id });
    res.status(200).json(farm);
  } catch (err) {
    next(err);
  }
};
