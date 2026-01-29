// Script de seed pour créer un compte admin par défaut
import { connectDB } from "../src/config/db.js";
import { createUser } from "../src/models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

async function seedAdmin() {
  await connectDB(process.env.MONGODB_URI);
  const email = "admin@demo.com";
  const password = "admin123";
  const username = "admin";
  const role = "admin";
  try {
    await createUser({ username, email, password, role });
    console.log("Admin créé :", email, password);
  } catch (e) {
    console.log("Erreur ou admin déjà existant :", e.message);
  }
  process.exit(0);
}

seedAdmin();
