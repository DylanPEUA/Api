import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("MongoDB connecté");
  } catch (err) {
    console.error("Erreur de connexion MongoDB :", err.message);
    process.exit(1);
  }
}