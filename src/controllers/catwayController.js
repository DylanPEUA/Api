import { createCatway, listCatways, updateCatway, deleteCatway } from "../models/catwayModel.js";


/**
 * Récupère tous les catways.
 *
 * @async
 * @function getCatways
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON contenant la liste des catways.
 */


export async function getCatways(req, res) {
  const catways = await listCatways();
  res.json(catways);
}


/**
 * Crée un nouveau catway.
 *
 * @async
 * @function addCatway
 * @param {Object} req - Requête Express contenant le body avec :
 *   @param {number} req.body.number - Numéro du catway
 *   @param {string} req.body.status - Statut du catway ("available", "occupied", etc.)
 *   @param {string} req.body.type - Type du catway
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON avec le message et l'ID du catway créé.
 */


export async function addCatway(req, res) {
  const { number, status, type } = req.body;
  const id = await createCatway({ number, status, type });
  res.status(201).json({ message: "Catway créé", id });
}


/**
 * Met à jour un catway existant.
 *
 * @async
 * @function editCatway
 * @param {Object} req - Requête Express contenant :
 *   @param {string} req.params.id - ID du catway à modifier
 *   @param {object} req.body - Données à mettre à jour
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON avec un message de confirmation.
 */


export async function editCatway(req, res) {
  const { id } = req.params;
  await updateCatway(id, req.body);
  res.json({ message: "Catway mis à jour" });
}


/**
 * Supprime un catway existant.
 *
 * @async
 * @function removeCatway
 * @param {Object} req - Requête Express contenant :
 *   @param {string} req.params.id - ID du catway à supprimer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>} Envoie une réponse JSON avec un message de confirmation.
 */


export async function removeCatway(req, res) {
  const { id } = req.params;
  await deleteCatway(id);
  res.json({ message: "Catway supprimé" });
}