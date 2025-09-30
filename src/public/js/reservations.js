// reservations.js
import { apiFetch } from './common.js';

const BASE = '/reservations';

export async function getReservations() {
  return apiFetch(BASE);
}

export async function getReservation(id) {
  return apiFetch(`${BASE}/${id}`);
}

export async function createReservation(data) {
  return apiFetch(BASE, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateReservation(id, data) {
  return apiFetch(`${BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteReservation(id) {
  return apiFetch(`${BASE}/${id}`, {
    method: 'DELETE'
  });
}