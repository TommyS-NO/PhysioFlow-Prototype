import express from "express";
import surveyController from "../controllers/surveyController.js";

const router = express.Router();

router.get("/:surveyId", (req, res, next) => {
	const { surveyId } = req.params;
	try {
		const survey = surveyController.getSurveyById(surveyId);
		res.json(survey);
	} catch (error) {
		next(error);
	}
});
router.get("/followup", (req, res, next) => {
	try {
		getSurveyById(req, res, next);
	} catch (error) {
		console.error(`Error in GET /followup: ${error.message}`);
		next(error);
	}
});

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
