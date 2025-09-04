import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "catways";

// Créer un catway
export async function createCatway({ number, status = "available", type }) {
  const db = getDB();
  const catway = { number, status, type, createdAt: new Date() };
  const result = await db.collection(COLLECTION).insertOne(catway);
  return result.insertedId;
}

// Lister tous les catways
export async function listCatways() {
  const db = getDB();
  return db.collection(COLLECTION).find().toArray();
}

// Mettre à jour un catway
export async function updateCatway(id, data) {
  const db = getDB();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

// Supprimer un catway
export async function deleteCatway(id) {
  const db = getDB();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}