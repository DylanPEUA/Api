import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidation, loginValidation, catwayValidation, reservationValidation } from "../middleware/validationMiddleware.js";
import { validationResult } from "express-validator";
import { getCatways, addCatway, editCatway, removeCatway } from "../controllers/catwayController.js";
import { getReservations, addReservation, editReservation, removeReservation } from "../controllers/reservationController.js";
import { authRequired, adminRequired } from "../middleware/authMiddleware.js";

const router = Router();

// Auth
router.post("/auth/register", registerValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}, register);

router.post("/auth/login", loginValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}, login);

// Catways (protégées)
router.get("/catways", authRequired, getCatways);
router.post("/catways", authRequired, adminRequired, catwayValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}, addCatway);
router.put("/catways/:id", authRequired, adminRequired, catwayValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}, editCatway);
router.delete("/catways/:id", authRequired, adminRequired, removeCatway);

// Reservations (protégées)
router.get("/reservations", authRequired, getReservations);
router.post("/reservations", authRequired, reservationValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}, addReservation);
router.put("/reservations/:id", authRequired, reservationValidation, (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}, editReservation);
router.delete("/reservations/:id", authRequired, adminRequired, removeReservation);

export default router;