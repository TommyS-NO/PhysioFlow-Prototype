import express from "express";
import {
	getExerciseDetails,
	getAllExercises,
} from "../controllers/exerciseController.js";
import { deleteExercise } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllExercises);

router.post("/details", (req, res, next) => {
	try {
		const details = getExerciseDetails(req.body);
		res.json(details);
	} catch (error) {
		next(error);
	}
});
router.delete("/:userId/exercises/:exerciseId", deleteExercise);

export default router;
