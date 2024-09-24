const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.update(req.user.id, name, email, password);
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.getById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
