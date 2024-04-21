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

// import express from "express";
// import surveyController from "../controllers/surveyController.js";
// import { evaluateWithAI } from "../openAI/chatbot.js";
// const router = express.Router();

// router.get("/:surveyId", (req, res) => {
// 	const { surveyId } = req.params;
// 	try {
// 		const survey = surveyController.getSurveyById(surveyId);
// 		res.json(survey);
// 	} catch (error) {
// 		console.error("Error fetching survey:", error);
// 		res.status(404).send("Survey not found");
// 	}
// });

// router.post("/evaluate/:surveyId", async (req, res) => {
// 	console.log(
// 		"Received evaluation request for survey ID:",
// 		req.params.surveyId,
// 	);
// 	const { surveyId } = req.params;
// 	const answers = req.body;
// 	const prompt = generatePromptForGPT3(answers, surveyId);

// 	try {
// 		const completion = await openai.createCompletion({
// 			model: "gpt-3.5-turbo",
// 			prompt: prompt,
// 			max_tokens: 150,
// 		});

// 		const aiResponse = await evaluateWithAI(answers, surveyId);
// 		res.json({
// 			aiResponse: aiResponse,
// 		});
// 	} catch (error) {
// 		console.error("Error during evaluation with AI:", error);
// 		res.status(400).json({ message: `Evaluation error: ${error.message}` });
// 	}
// });

// export default router;
