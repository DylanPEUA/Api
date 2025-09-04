import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLLECTION = "reservations";


/**
 * Crée une nouvelle réservation dans la base de données.
 *
 * @async
 * @function createReservation
 * @param {Object} reservation - Objet réservation
 * @param {string} reservation.catwayId - ID du catway réservé
 * @param {string} reservation.userId - ID de l'utilisateur
 * @param {string} reservation.boatName - Nom du bateau
 * @param {string|Date} reservation.arrivalDate - Date d'arrivée
 * @param {string|Date} reservation.departureDate - Date de départ
 * @param {string} [reservation.status="pending"] - Statut de la réservation
 * @returns {Promise<string>} ID de la réservation créée
 */


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


/**
 * Récupère toutes les réservations.
 *
 * @async
 * @function listReservations
 * @returns {Promise<Array<Object>>} Liste de toutes les réservations
 */


export async function listReservations() {
  const db = getDB();
  return db.collection(COLLECTION).find().toArray();
}


/**
 * Met à jour une réservation existante.
 *
 * @async
 * @function updateReservation
 * @param {string} id - ID de la réservation à mettre à jour
 * @param {Object} data - Données à mettre à jour (catwayId, userId, boatName, dates, status, etc.)
 * @returns {Promise<Object>} Résultat de l'opération MongoDB
 */


export async function updateReservation(id, data) {
  const db = getDB();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}


/**
 * Supprime une réservation existante.
 *
 * @async
 * @function deleteReservation
 * @param {string} id - ID de la réservation à supprimer
 * @returns {Promise<Object>} Résultat de l'opération MongoDB
 */


export async function deleteReservation(id) {
  const db = getDB();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}