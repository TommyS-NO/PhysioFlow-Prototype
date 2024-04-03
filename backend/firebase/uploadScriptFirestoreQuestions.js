import { db } from "./firebaseAdmin.js";
import { questionsData } from "./focusNeckQuestion.js";

const uploadQuestion = async (path, questionData) => {
	const questionDocPath = `${path}/${questionData.id}`;
	console.log(`Uploading question at path: ${questionDocPath}`);

	await db.doc(questionDocPath).set(questionData);
	console.log(`Question uploaded at path: ${questionDocPath}`);
	if (questionData.followUp) {
		for (const [option, followUpId] of Object.entries(questionData.followUp)) {
			const followUpQuestionData =
				questionsData.focusAreas.neck.questionsById[followUpId];
			if (followUpQuestionData) {
				const followUpPath = `${questionDocPath}/followUpQuestions`;
				console.log(
					`Uploading follow-up question at path: ${followUpPath}/${followUpId}`,
				);
				await uploadQuestion(followUpPath, followUpQuestionData);
			}
		}
	}
};

const uploadFocusArea = async (focusAreaKey, focusAreaData) => {
	const focusAreaPath = `focusAreas/${focusAreaKey}`;
	console.log(`Uploading focus area at path: ${focusAreaPath}`);
	await db.doc(focusAreaPath).set({ name: focusAreaData.name });
	console.log(`Focus area ${focusAreaKey} uploaded successfully.`);

	await Promise.all(
		Object.values(focusAreaData.questionsById).map((questionData) =>
			uploadQuestion(`${focusAreaPath}/questionsById`, questionData),
		),
	);
};

const uploadGeneralQuestions = async () => {
	const generalQuestionsPath = "generalQuestions/general";
	console.log(`Uploading general questions at path: ${generalQuestionsPath}`);
	await db
		.doc(generalQuestionsPath)
		.set({ questions: questionsData.generalQuestions });
	console.log("General questions uploaded successfully.");
};

const uploadAllQuestions = async () => {
	console.log("Starting the upload of questions...");

	await uploadGeneralQuestions();
	await Promise.all(
		Object.entries(questionsData.focusAreas).map(
			([focusAreaKey, focusAreaData]) =>
				uploadFocusArea(focusAreaKey, focusAreaData),
		),
	);

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
