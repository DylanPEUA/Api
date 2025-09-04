import { createReservation, listReservations, updateReservation, deleteReservation } from "../models/reservationModel.js";


/**
 * Récupère toutes les réservations.
 *
 * @async
 * @function getReservations
 * @param {import("express").Request} req - Requête Express
 * @param {import("express").Response} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON contenant la liste des réservations.
 */


export async function getReservations(req, res) {
  const reservations = await listReservations();
  res.json(reservations);
}


/**
 * Crée une nouvelle réservation.
 *
 * @async
 * @function addReservation
 * @param {import("express").Request} req - Requête Express contenant le body avec :
 *   @param {string} req.body.catwayId - ID du catway réservé
 *   @param {string} req.body.userId - ID de l'utilisateur
 *   @param {string} req.body.boatName - Nom du bateau
 *   @param {string} req.body.arrivalDate - Date d'arrivée
 *   @param {string} req.body.departureDate - Date de départ
 *   @param {string} req.body.status - Statut de la réservation ("confirmed", "pending", etc.)
 * @param {import("express").Response} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON avec le message et l'ID de la réservation créée.
 */


export async function addReservation(req, res) {
  const { catwayId, userId, boatName, arrivalDate, departureDate, status } = req.body;
  const id = await createReservation({ catwayId, userId, boatName, arrivalDate, departureDate, status });
  res.status(201).json({ message: "Réservation créée", id });
}


/**
 * Met à jour une réservation existante.
 *
 * @async
 * @function editReservation
 * @param {import("express").Request} req - Requête Express contenant :
 *   @param {string} req.params.id - ID de la réservation à modifier
 *   @param {object} req.body - Données à mettre à jour
 * @param {import("express").Response} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON avec un message de confirmation.
 */


export async function editReservation(req, res) {
  const { id } = req.params;
  await updateReservation(id, req.body);
  res.json({ message: "Réservation mise à jour" });
}


/**
 * Supprime une réservation existante.
 *
 * @async
 * @function removeReservation
 * @param {import("express").Request} req - Requête Express contenant :
 *   @param {string} req.params.id - ID de la réservation à supprimer
 * @param {import("express").Response} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON avec un message de confirmation.
 */


export async function removeReservation(req, res) {
  const { id } = req.params;
  await deleteReservation(id);
  res.json({ message: "Réservation supprimée" });
}