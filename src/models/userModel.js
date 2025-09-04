import { getDB } from "../config/db.js";
import bcrypt from "bcryptjs";

const COLLECTION = "users";


/**
 * Crée un nouvel utilisateur dans la base de données.
 *
 * @async
 * @function createUser
 * @param {Object} user - Objet utilisateur
 * @param {string} user.username - Nom d'utilisateur
 * @param {string} user.email - Email de l'utilisateur
 * @param {string} user.password - Mot de passe en clair
 * @param {string} [user.role="user"] - Rôle de l'utilisateur
 * @returns {Promise<string>} ID de l'utilisateur créé
 */


export async function createUser({ username, email, password, role = "user" }) {
  const db = getDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, email, password: hashedPassword, role, createdAt: new Date() };
  const result = await db.collection(COLLECTION).insertOne(user);
  return result.insertedId;
}


/**
 * Trouve un utilisateur par son email.
 *
 * @async
 * @function findUserByEmail
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Object|null>} Objet utilisateur si trouvé, sinon null
 */


export async function findUserByEmail(email) {
  const db = getDB();
  return db.collection(COLLECTION).findOne({ email });
}


/**
 * Vérifie qu'un mot de passe correspond au hash stocké pour un utilisateur.
 *
 * @async
 * @function checkPassword
 * @param {Object} user - Objet utilisateur récupéré depuis la base
 * @param {string} password - Mot de passe en clair à vérifier
 * @returns {Promise<boolean>} true si le mot de passe est correct, false sinon
 */


export async function checkPassword(user, password) {
  return bcrypt.compare(password, user.password);
}


/**
 * Récupère tous les utilisateurs.
 *
 * @async
 * @function listUsers
 * @returns {Promise<Array<Object>>} Liste de tous les utilisateurs
 */


export async function listUsers() {
  const db = getDB();
  return db.collection(COLLECTION).find().toArray();
}


/**
 * Supprime un utilisateur par ID.
 *
 * @async
 * @function deleteUser
 * @param {string} id - ID de l'utilisateur à supprimer
 * @returns {Promise<Object>} Résultat de l'opération MongoDB
 */


export async function deleteUser(id) {
  const db = getDB();
  return db.collection(COLLECTION).deleteOne({ _id: id });
}