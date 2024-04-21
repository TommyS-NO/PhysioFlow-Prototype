import express from "express";
import { getExerciseDetails } from "../controllers/exerciseController.js";

const router = express.Router();

// Henter detaljer for en liste med øvelser
router.post("/details", (req, res, next) => {
	try {
		const details = getExerciseDetails(req.body);
		res.json(details);
	} catch (error) {
		next(error);
	}
});

export default router;
