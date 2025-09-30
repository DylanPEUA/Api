// catways.js
import { apiFetch } from './common.js';

const BASE = '/catways';

export async function getCatways() {
  return apiFetch(BASE);
}

export async function getCatway(id) {
  return apiFetch(`${BASE}/${id}`);
}

export async function createCatway(data) {
  return apiFetch(BASE, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateCatway(id, data) {
  return apiFetch(`${BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteCatway(id) {
  return apiFetch(`${BASE}/${id}`, {
    method: 'DELETE'
  });
}