import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "reservations";

// Créer une réservation
export async function createReservation({ catwayId, userId, boatName, arrivalDate, departureDate, status = "pending" }) {
  const db = getDB();
  const reservation = {
    catwayId: new ObjectId(catwayId),
    userId: new ObjectId(userId),
    boatName,
    arrivalDate: new Date(arrivalDate),
    departureDate: new Date(departureDate),
    status,
    createdAt: new Date(),
  };
  const result = await db.collection(COLLECTION).insertOne(reservation);
  return result.insertedId;
}

// Lister toutes les réservations
export async function listReservations() {
  const db = getDB();
  return db.collection(COLLECTION).find().toArray();
}

// Mettre à jour une réservation
export async function updateReservation(id, data) {
  const db = getDB();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

// Supprimer une réservation
export async function deleteReservation(id) {
  const db = getDB();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}