import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "catways";


/**
 * Crée un nouveau catway dans la base de données.
 *
 * @async
 * @function createCatway
 * @param {Object} catway - Objet catway à créer
 * @param {number} catway.number - Numéro du catway
 * @param {string} [catway.status="available"] - Statut du catway
 * @param {string} catway.type - Type du catway
 * @returns {Promise<string>} ID du catway créé
 */


export async function createCatway({ number, status = "available", type }) {
  const db = getDB();
  const catway = { number, status, type, createdAt: new Date() };
  const result = await db.collection(COLLECTION).insertOne(catway);
  return result.insertedId;
}


/**
 * Récupère tous les catways.
 *
 * @async
 * @function listCatways
 * @returns {Promise<Array<Object>>} Liste de tous les catways
 */


export async function listCatways() {
  const db = getDB();
  return db.collection(COLLECTION).find().toArray();
}


/**
 * Met à jour un catway existant.
 *
 * @async
 * @function updateCatway
 * @param {string} id - ID du catway à mettre à jour
 * @param {Object} data - Données à mettre à jour (number, status, type, etc.)
 * @returns {Promise<Object>} Résultat de l'opération MongoDB
 */


export async function updateCatway(id, data) {
  const db = getDB();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}


/**
 * Supprime un catway existant.
 *
 * @async
 * @function deleteCatway
 * @param {string} id - ID du catway à supprimer
 * @returns {Promise<Object>} Résultat de l'opération MongoDB
 */


export async function deleteCatway(id) {
  const db = getDB();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}