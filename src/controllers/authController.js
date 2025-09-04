import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, checkPassword } from "../models/userModel.js";


/**
 * Crée un nouvel utilisateur.
 *
 * @async
 * @function register
 * @param {import("express").Request} req - Requête Express contenant le body avec username, email, password et role.
 * @param {import("express").Response} res - Réponse Express utilisée pour renvoyer le résultat.
 * @returns {Promise<void>} Envoie une réponse JSON avec le message et l'ID utilisateur créé.
 * @throws {Error} Envoie une erreur 500 si la création échoue.
 */


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


/**
 * Connecte un utilisateur existant et renvoie un token JWT.
 *
 * @async
 * @function login
 * @param {import("express").Request} req - Requête Express contenant le body avec email et password.
 * @param {import("express").Response} res - Réponse Express utilisée pour renvoyer le token.
 * @returns {Promise<void>} Envoie une réponse JSON avec le token JWT si la connexion est réussie.
 * @throws {Error} Envoie une erreur 400 si l'utilisateur n'existe pas ou si le mot de passe est incorrect. Envoie une erreur 500 si la connexion échoue.
 */


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