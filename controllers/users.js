import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_TOKEN = process.env.SECRET_TOKEN;

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, SECRET_TOKEN, {
    expiresIn: "1h",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Invalid credentials." });
    }
    const token = generateToken(user);
    res.json({ token, user: {username: user.username, email: user.email}});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };
    console.log("Creating user", newUser)
    try {
      const data = await User.create(newUser);
      res.status(201).json(data);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  