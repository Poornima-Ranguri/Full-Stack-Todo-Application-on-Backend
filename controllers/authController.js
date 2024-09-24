const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create(name, email, password);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
