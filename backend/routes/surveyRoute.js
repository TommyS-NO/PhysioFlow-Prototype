import express from "express";
import surveyController from "../controllers/surveyController.js";

const router = express.Router();

// Get a specific survey by ID
router.get("/:surveyId", (req, res, next) => {
	const { surveyId } = req.params;
	try {
		const survey = surveyController.getSurveyById(surveyId);
		res.json(survey);
	} catch (error) {
		next(error);
	}
});

// Post answers to evaluate a survey
router.post("/evaluate/:surveyId", (req, res, next) => {
	const { surveyId } = req.params;
	const answers = req.body;
	try {
		const result = surveyController.evaluateDiagnosis(answers, surveyId);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default router;
