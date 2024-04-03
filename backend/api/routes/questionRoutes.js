import express from "express";
import {
	getGeneralQuestions,
	getQuestionsByFocusArea,
	getIndividualQuestion,
	getFollowUpQuestions,
} from "../controllers/firestoreQuestionsController.js";

const router = express.Router();

router.get("/general", getGeneralQuestions);
router.get("/focusAreas/:focusArea", getQuestionsByFocusArea);
router.get(
	"/focusAreas/:focusArea/questionsById/:questionId",
	getIndividualQuestion,
);
router.get(
	"/focusAreas/:focusArea/questionsById/:questionId/followUps",
	getFollowUpQuestions,
);

export default router;
