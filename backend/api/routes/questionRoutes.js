import express from "express";
import {
	getGeneralQuestions,
	getQuestionsByFocusArea,
	getIndividualQuestion,
	getFollowUpQuestions,
	handleAnswer,
} from "../controllers/firestoreQuestionsController.js";

const router = express.Router();

// Rute for å håndtere POST-forespørsel for svar
router.post("/answer", handleAnswer);

// Rute for å hente generelle spørsmål
router.get("/general", getGeneralQuestions);

// Rute for å hente spørsmål basert på fokusområde
router.get("/focusAreas/:focusArea", getQuestionsByFocusArea);

// Rute for å hente et individuelt spørsmål innenfor et fokusområde
router.get(
	"/focusAreas/:focusArea/questionsById/:questionId",
	getIndividualQuestion,
);

// Rute for å hente oppfølgingsspørsmål for et gitt spørsmål
router.get(
	"/focusAreas/:focusArea/questionsById/:questionId/followUps",
	getFollowUpQuestions,
);

export default router;
