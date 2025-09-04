import { getDB } from "../config/db.js";
import bcrypt from "bcryptjs";

const COLLECTION = "users";

// Créer un utilisateur
export async function createUser({ username, email, password, role = "user" }) {
  const db = getDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, email, password: hashedPassword, role, createdAt: new Date() };
  const result = await db.collection(COLLECTION).insertOne(user);
  return result.insertedId;
}

// Trouver un utilisateur par email
export async function findUserByEmail(email) {
  const db = getDB();
  return db.collection(COLLECTION).findOne({ email });
}

// Vérifier un mot de passe
export async function checkPassword(user, password) {
  return bcrypt.compare(password, user.password);
}

// Lister tous les utilisateurs
export async function listUsers() {
  const db = getDB();
  return db.collection(COLLECTION).find().toArray();
}

// Supprimer un utilisateur
export async function deleteUser(id) {
  const db = getDB();
  return db.collection(COLLECTION).deleteOne({ _id: id });
}