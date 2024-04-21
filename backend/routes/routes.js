import express from "express";
import { getDiagnoses } from "../controllers/diagnosisController.js";
import { getExerciseDetails } from "../controllers/exerciseController.js";
import {
	getSurveyById,
	evaluateDiagnosisAnswers,
} from "../controllers/surveyController.js";

const router = express.Router();

// Diagnosis routes
router.get("/diagnoses/:type?", getDiagnoses);

// Exercise routes
router.post("/exercises/details", getExerciseDetails);

// Survey routes
router.get("/surveys/:surveyId", (req, res, next) => {
	try {
		getSurveyById(req, res, next);
	} catch (error) {
		console.error(
			`Error in GET /surveys/${req.params.surveyId}: ${error.message}`,
		);
		next(error);
	}
});

router.post("/surveys/evaluate/:surveyId", (req, res, next) => {
	try {
		evaluateDiagnosisAnswers(req, res, next);
	} catch (error) {
		next(error);
	}
});

export default router;
