import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { getCatways, addCatway, editCatway, removeCatway } from "../controllers/catwayController.js";
import { getReservations, addReservation, editReservation, removeReservation } from "../controllers/reservationController.js";
import { authRequired, adminRequired } from "../middleware/authMiddleware.js";

const router = Router();

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);

// Catways (protégées)
router.get("/catways", authRequired, getCatways);
router.post("/catways", authRequired, adminRequired, addCatway);
router.put("/catways/:id", authRequired, adminRequired, editCatway);
router.delete("/catways/:id", authRequired, adminRequired, removeCatway);

// Reservations (protégées)
router.get("/reservations", authRequired, getReservations);
router.post("/reservations", authRequired, addReservation);
router.put("/reservations/:id", authRequired, editReservation);
router.delete("/reservations/:id", authRequired, adminRequired, removeReservation);

export default router;