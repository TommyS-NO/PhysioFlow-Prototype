import { db } from "../backend/firebase/firebaseAdmin.js";
import { questionsData } from "../backend/firebase/focusNeckQuestion.js";

const uploadQuestion = async (path, questionData) => {
	// Endring: Lagrer hele spørsmålsdata under spesifikk ID
	await db.doc(`${path}/${questionData.id}`).set(questionData);
	console.log(`Question uploaded at path: ${path}/${questionData.id}`);

	// Opplasting av oppfølgingsspørsmål hvis de finnes
	if (questionData.followUp) {
		await uploadFollowUpQuestions(
			`${path}/${questionData.id}`,
			questionData.followUp,
		);
	}
};

const uploadFocusArea = async (focusAreaKey, focusAreaData) => {
	const focusAreaPath = `focusAreas/${focusAreaKey}`;
	await db.doc(focusAreaPath).set({ name: focusAreaData.name });
	console.log(`Focus area ${focusAreaKey} uploaded successfully.`);

	// Opplasting av toppnivå spørsmål
	for (const questionData of Object.values(focusAreaData.questionsById)) {
		const questionPath = `${focusAreaPath}/questionsById`;
		await uploadQuestion(questionPath, questionData);
	}
};

const uploadFollowUpQuestions = async (parentPath, followUpKeys) => {
	for (const followUpKey of Object.values(followUpKeys)) {
		const followUpQuestionData =
			questionsData.focusAreas.neck.questionsById[followUpKey];
		if (followUpQuestionData) {
			await uploadQuestion(parentPath, followUpQuestionData);
		}
	}
};

const uploadGeneralQuestions = async () => {
	const generalQuestionsPath = "generalQuestions/general";
	await db
		.doc(generalQuestionsPath)
		.set({ questions: questionsData.generalQuestions });
	console.log("General questions uploaded successfully.");
};

const uploadAllQuestions = async () => {
	console.log("Starting the upload of questions...");

	await uploadGeneralQuestions();
	for (const [focusAreaKey, focusAreaData] of Object.entries(
		questionsData.focusAreas,
	)) {
		await uploadFocusArea(focusAreaKey, focusAreaData);
	}

	console.log(
		"All questions have been successfully uploaded. Upload complete.",
	);
};

uploadAllQuestions()
	.then(() => {
		console.log("Upload script completed. Exiting Node.js process.");
		process.exit(0);
	})
	.catch((error) => {
		console.error("An error occurred while running the script:", error);
		process.exit(1);
	});
