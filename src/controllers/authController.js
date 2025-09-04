import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, checkPassword } from "../models/userModel.js";

export async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ error: "Email déjà utilisé" });

    const userId = await createUser({ username, email, password, role });
    res.status(201).json({ message: "Utilisateur créé", userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Utilisateur introuvable" });

    const valid = await checkPassword(user, password);
    if (!valid) return res.status(400).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}