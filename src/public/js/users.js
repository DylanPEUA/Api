// users.js
import { apiFetch } from './common.js';

const BASE = '/users';

export async function getUsers() {
  return apiFetch(BASE);
}

export async function getUser(email) {
  return apiFetch(`${BASE}/${email}`);
}

export async function createUser(data) {
  return apiFetch(BASE, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateUser(email, data) {
  return apiFetch(`${BASE}/${email}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteUser(email) {
  return apiFetch(`${BASE}/${email}`, {
    method: 'DELETE'
  });
}