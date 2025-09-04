import jwt from "jsonwebtoken";


/**
 * Middleware pour protéger une route nécessitant une authentification.
 *
 * Vérifie que le token JWT est présent et valide dans l'en-tête Authorization.
 *
 * @function authRequired
 * @param {import("express").Request} req - Requête Express
 * @param {import("express").Response} res - Réponse Express
 * @param {import("express").NextFunction} next - Fonction pour passer au middleware suivant
 * @returns {void} Appelle next() si le token est valide, sinon renvoie une erreur 401 ou 403.
 */


export function authRequired(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalide" });
  }
}


/**
 * Middleware pour protéger une route nécessitant un rôle admin.
 *
 * Vérifie que l'utilisateur connecté possède le rôle "admin".
 *
 * @function adminRequired
 * @param {import("express").Request} req - Requête Express (doit contenir req.user)
 * @param {import("express").Response} res - Réponse Express
 * @param {import("express").NextFunction} next - Fonction pour passer au middleware suivant
 * @returns {void} Appelle next() si l'utilisateur est admin, sinon renvoie une erreur 403.
 */


export function adminRequired(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Accès refusé (admin requis)" });
  }
  next();
}