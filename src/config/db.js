import { MongoClient } from "mongodb";

let client;
let db;

export async function connectDB(uri) {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(); // nom de la base est pris dans l’URI
    console.log(" MongoDB connecté");
    return db;
  } catch (err) {
    console.error(" Erreur de connexion MongoDB :", err.message);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error(" La base n'est pas encore connectée !");
  }
  return db;
}