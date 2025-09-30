// common.js
const API_URL = "/api";

/**
 * Récupère le token stocké
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Supprime le token (déconnexion)
 */
export function clearToken() {
  localStorage.removeItem("token");
}

/**
 * Requête fetch avec token et gestion des erreurs
 */
export async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || "Erreur API");
  }

  return res.json();
}