import { neckSurvey } from "../surveys/neckSurvey.js";
import { neckDiagnoses } from "../diagnoses/neckDiagnoses.js";
import { interpretAnswers } from "../utils/surveyUtils.js";

const surveyController = {
	surveys: {
		neck: neckSurvey,
	},

	evaluateDiagnosis: function (answers, surveyId) {
		console.log(
			`Evaluating diagnosis for survey ID: ${surveyId} with answers:`,
			answers,
		);

		const survey = this.surveys[surveyId];
		if (!survey) {
			throw new Error("Survey not found");
		}

		const diagnoses = neckDiagnoses; // Assuming that diagnoses are directly accessible
		const symptoms = interpretAnswers(answers, survey.questions);
		console.log("Interpreted symptoms:", symptoms);

		const diagnosisScores = {};
		for (const diagnosis in diagnoses) {
			diagnosisScores[diagnosis] = 0;
		}

		for (const symptom of symptoms) {
			for (const [diagnosis, { keySymptoms }] of Object.entries(diagnoses)) {
				if (keySymptoms.includes(symptom)) {
					diagnosisScores[diagnosis]++;
					console.log(
						`Incrementing score for diagnosis ${diagnosis} based on symptom ${symptom}`,
					);
				}
			}
		}

		console.log("Diagnosis scores:", diagnosisScores);
		let highestScore = 0;
		let finalDiagnosis = "No clear diagnosis";

		for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
			if (score > highestScore) {
				highestScore = score;
				finalDiagnosis = diagnosis;
				console.log(
					`New highest score ${highestScore} for diagnosis ${diagnosis}`,
				);
			}
		}

		if (highestScore >= 2) {
			console.log(`Final diagnosis: ${neckDiagnoses[finalDiagnosis].name}`);
			return {
				diagnosis: neckDiagnoses[finalDiagnosis].name,
				description: neckDiagnoses[finalDiagnosis].description,
				exercises: neckDiagnoses[finalDiagnosis].recommendedExercises,
			};
		}
		console.log("No clear diagnosis achieved, defaulting to general advice");
		return {
			diagnosis: selectedDiagnosis.name,
			description: selectedDiagnosis.description,
			exercises: selectedDiagnosis.recommendedExercises,
		};
	},

	getSurveyById: function (surveyId) {
		console.log(`Fetching survey with ID: ${surveyId}`);
		const survey = this.surveys[surveyId];
		if (!survey) {
			console.error("Survey not found");
			throw new Error("Survey not found");
		}
		return survey;
	},
};

export default surveyController;
