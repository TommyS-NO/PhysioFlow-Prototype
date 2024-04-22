// import neckDiagnoses from "../diagnoses/neckDiagnoses.js";
// import ankleDiagnoses from "../diagnoses/ankleDiagnoses.js";
// import elbowDiagnoses from "../diagnoses/elbowDiagnoses.js";
// import hipDiagnoses from "../diagnoses/hipDiagnoses.js";
// import kneeDiagnoses from "../diagnoses/kneeDiagnoses.js";
// import lowBackDiagnoses from "../diagnoses/lowBackDiagnoses.js";
// import shoulderDiagnoses from "../diagnoses/shoulderDiagnoses.js";
// import upperBackDiagnoses from "../diagnoses/upperBackDiagnoses.js";
// import wristDiagnoses from "../diagnoses/wristDiagnoses.js";

// const allDiagnoses = {
// 	...neckDiagnoses,
// 	...ankleDiagnoses,
// 	...elbowDiagnoses,
// 	...hipDiagnoses,
// 	...kneeDiagnoses,
// 	...lowBackDiagnoses,
// 	...shoulderDiagnoses,
// 	...upperBackDiagnoses,
// 	...wristDiagnoses,
// };
// export const getAllDiagnoses = (req, res) => {
// 	try {
// 		res.status(200).json(allDiagnoses);
// 	} catch (error) {
// 		console.error("Error fetching all diagnoses:", error);
// 		res.status(500).json({ message: "Error fetching all diagnoses", error });
// 	}
// };

// export const getDiagnosisDetails = (req, res) => {
// 	try {
// 		const { diagnosisKey } = req.body;
// 		const diagnosisDetails = allDiagnoses[diagnosisKey];
// 		if (!diagnosisDetails) {
// 			return res.status(404).json({ message: "Diagnosis not found" });
// 		}
// 		res.status(200).json(diagnosisDetails);
// 	} catch (error) {
// 		console.error("Error fetching diagnosis details:", error);
// 		res
// 			.status(500)
// 			.json({ message: "Error fetching diagnosis details", error });
// 	}
// };

// import express from "express";
// import surveyController from "../backend/controllers/surveyController.js";
// import { evaluateWithAI } from "../backend/openAI/chatbot.js";
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

{
	/* Har fjernet modalen under og lagt opp navigering til searchScreen med valgte øvelser. Legger den her tilfelle vi trenger noe*/
}
{
	/* {isExerciseModalVisible && (
				<CustomModal
					visible={isExerciseModalVisible}
					onClose={() => setIsExerciseModalVisible(false)}
					title="Anbefalte øvelser"
					style={styles.modalView}
				>
					<ScrollView style={styles.content}>
						{exerciseDetails.map((exercise, index) => {
							console.log(`Exercise #${index}:`, exercise);

							return (
								<View key={index} style={styles.exerciseDetailContainer}>
									<Text style={styles.exerciseTitle}>
										{diagnosisResult.exercises[index]}
									</Text>
									<Text style={styles.exerciseDescription}>
										{exercise.description}
									</Text>
									<Image
										source={{
											uri: exercise.image.replace(
												"localhost",
												"192.168.10.182", //"192.168.10.182" Tommy IP
											),
										}}
										style={styles.exerciseImage}
									/>
								</View>
							);
						})}
					</ScrollView>
				</CustomModal>
			)} */
}

// const handleViewExercises = async () => {
// 	if (diagnosisResult && diagnosisResult.exercises.length > 0) {
// 		try {
// 			const exerciseDetailsResponse = await surveyService.getExerciseDetails(
// 				diagnosisResult.exercises,
// 			);
// 			setExerciseDetails(exerciseDetailsResponse);
// 			setIsExerciseModalVisible(true);
// 		} catch (error) {
// 			console.error("Failed to load exercise details: ", error);
// 		}
// 	}
// };
