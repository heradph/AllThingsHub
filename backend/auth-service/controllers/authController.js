const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      googleId: user.googleId,
      displayName: user.displayname,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.getUserByUsername(username);
    if (existing)
      return res.status(400).json({ message: "Username sudah dipakai!" });

    const hashed = await bcrypt.hash(password, 10);
    await User.createUser(username, hashed);
    res.status(201).json({ message: "Register Sukses!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.getUserByUsername(username);
    if (!user)
      return res.status(400).json({ message: "Username atau Password salah!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Username atau Password salah!" });

    const token = generateToken({
      id: user.id,
      username: user.username,
      displayName: user.displayname,
      role: user.role,
    });
    res.json({ message: "Login Sukses!", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateTokenForGoogleUser = (user) => {
  return generateToken({
    id: user.id,
    username: user.displayname,
    googleId: user.googleId,
    role: user.role,
  });
};

module.exports = {
  register,
  login,
  generateTokenForGoogleUser,
};
