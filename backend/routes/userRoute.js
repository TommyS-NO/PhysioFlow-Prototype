import express from "express";
import {
	getUserDiagnoses,
	saveDiagnosisForUser,
	deleteDiagnosisForUser,
	getCompletedExercisesForUser,
	saveCompletedExerciseForUser,
	deleteExerciseForUser,
} from "../controllers/user/userHealthRecords.js";

const router = express.Router();

router.get("/:userId/diagnoses", getUserDiagnoses);
router.post("/:userId/diagnoses", saveDiagnosisForUser);
router.delete("/:userId/diagnoses/:diagnosisId", deleteDiagnosisForUser);

router.get("/:userId/exercises", getCompletedExercisesForUser);
router.post("/:userId/exercises", saveCompletedExerciseForUser);
router.delete("/:userId/exercises/:exerciseId", deleteExerciseForUser);

router.get("/:userId/completedExercises", getCompletedExercisesForUser);
router.post("/:userId/completedExercises", saveCompletedExerciseForUser);

export default router;
