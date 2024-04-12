import express from "express";
import surveyController from "../controllers/surveyController.js";

const router = express.Router();

router.get("/:surveyId", (req, res) => {
	const { surveyId } = req.params;
	try {
		const survey = surveyController.getSurveyById(surveyId);
		res.json(survey);
	} catch (error) {
		console.error("Error fetching survey:", error);
		res.status(404).send("Survey not found");
	}
});

router.post("/evaluate/:surveyId", (req, res) => {
	console.log(
		"Received evaluation request for survey ID:",
		req.params.surveyId,
	);
	const { surveyId } = req.params;
	const answers = req.body;

	try {
		console.log("Evaluating diagnosis with answers:", answers);

		const result = surveyController.evaluateDiagnosis(answers, surveyId);
		console.log("Evaluation result:", result);
		res.json(result);
	} catch (error) {
		console.error("Error during evaluation:", error);
		res.status(400).json({ message: error.message });
	}
});

export default router;
