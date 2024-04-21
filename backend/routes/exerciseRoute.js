import express from "express";
import {
	getExerciseDetails,
	getAllExercises,
} from "../controllers/exerciseController.js"; // Import getAllExercises here

const router = express.Router();

router.get("/", getAllExercises); // Now getAllExercises is defined

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
