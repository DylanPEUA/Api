import { body } from "express-validator";

/**
 * Validation pour l'inscription d'un utilisateur
 */
export const registerValidation = [
  body("username").isLength({ min: 3 }).withMessage("Le nom d'utilisateur doit contenir au moins 3 caractères"),
  body("email").isEmail().withMessage("Email invalide"),
  body("password").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("role").optional().isIn(["admin", "user"]).withMessage("Rôle invalide")
];

/**
 * Validation pour la connexion
 */
export const loginValidation = [
  body("email").isEmail().withMessage("Email invalide"),
  body("password").notEmpty().withMessage("Mot de passe requis")
];

/**
 * Validation pour la création d'un catway
 */
export const catwayValidation = [
  body("name").notEmpty().withMessage("Nom du catway requis"),
  body("location").notEmpty().withMessage("Emplacement requis")
];

/**
 * Validation pour la création d'une réservation
 */
export const reservationValidation = [
  body("catwayId").notEmpty().withMessage("Catway requis"),
  body("boatName").notEmpty().withMessage("Nom du bateau requis"),
  body("arrivalDate").isISO8601().withMessage("Date d'arrivée invalide"),
  body("departureDate").isISO8601().withMessage("Date de départ invalide")
];
