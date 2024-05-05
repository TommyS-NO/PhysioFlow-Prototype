import express from "express";
import {
	getUserDiagnoses,
	getUserExercises,
	getCompletedExercisesForUser,
	saveDiagnosisForUser,
	saveExerciseForUser,
	saveCompletedExerciseForUser,
	getAIResponseWithLocalData,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId/diagnoses", getUserDiagnoses);
router.post("/:userId/diagnoses", saveDiagnosisForUser);

router.get("/:userId/exercises", getUserExercises);
router.post("/:userId/exercises", saveExerciseForUser);

router.get("/:userId/completedExercises", getCompletedExercisesForUser);
router.post("/:userId/completedExercises", saveCompletedExerciseForUser);

router.post("/:userId/ai", getAIResponseWithLocalData);

export default router;
