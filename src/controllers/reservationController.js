import { createReservation, listReservations, updateReservation, deleteReservation } from "../models/reservationModel.js";

export async function getReservations(req, res) {
  const reservations = await listReservations();
  res.json(reservations);
}

export async function addReservation(req, res) {
  const { catwayId, userId, boatName, arrivalDate, departureDate, status } = req.body;
  const id = await createReservation({ catwayId, userId, boatName, arrivalDate, departureDate, status });
  res.status(201).json({ message: "Réservation créée", id });
}

export async function editReservation(req, res) {
  const { id } = req.params;
  await updateReservation(id, req.body);
  res.json({ message: "Réservation mise à jour" });
}

export async function removeReservation(req, res) {
  const { id } = req.params;
  await deleteReservation(id);
  res.json({ message: "Réservation supprimée" });
}