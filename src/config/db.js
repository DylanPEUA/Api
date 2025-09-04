import { MongoClient } from "mongodb";

let client;
let db;

/**
 * Connecte l'application à MongoDB.
 *
 * @async
 * @function connectDB
 * @param {string} uri - L'URI de connexion MongoDB (ex: mongodb://localhost:27017/nom_base)
 * @returns {Promise<Db>} Retourne l'objet `Db` de la base connectée.
 * @throws {Error} Arrête le processus si la connexion échoue.
 */ 

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

/**
 * Récupère l'objet `Db` connecté.
 *
 * @function getDB
 * @returns {Db} L'objet `Db` connecté.
 * @throws {Error} Si la connexion n'a pas encore été établie.
 */

export function getDB() {
  if (!db) {
    throw new Error(" La base n'est pas encore connectée !");
  }
  return db;
}