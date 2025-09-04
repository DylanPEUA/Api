import { createCatway, listCatways, updateCatway, deleteCatway } from "../models/catwayModel.js";

export async function getCatways(req, res) {
  const catways = await listCatways();
  res.json(catways);
}

export async function addCatway(req, res) {
  const { number, status, type } = req.body;
  const id = await createCatway({ number, status, type });
  res.status(201).json({ message: "Catway créé", id });
}

export async function editCatway(req, res) {
  const { id } = req.params;
  await updateCatway(id, req.body);
  res.json({ message: "Catway mis à jour" });
}

export async function removeCatway(req, res) {
  const { id } = req.params;
  await deleteCatway(id);
  res.json({ message: "Catway supprimé" });
}