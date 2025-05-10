// --- controllers/user.controller.js ---
export const getProfile = async (req, res) => {
  res.json({ message: "Authenticated user profile", user: req.user });
};
