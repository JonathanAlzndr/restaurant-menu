import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    // Validasi role
    if (role !== "admin" && role !== "user") {
      return res.status(400).json({ msg: "Invalid role" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role, // Simpan role
    });

    res
      .status(201)
      .json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
