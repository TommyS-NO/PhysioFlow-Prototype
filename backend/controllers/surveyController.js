import { ankleSurvey } from "../surveys/ankleSurvey.js";
import { ankleDiagnoses } from "../diagnoses/ankleDiagnoses.js";
import { elbowSurvey } from "../surveys/elbowSurvey.js";
import { elbowDiagnoses } from "../diagnoses/elbowDiagnoses.js";
import { hipSurvey } from "../surveys/hipSurvey.js";
import { hipDiagnoses } from "../diagnoses/hipDiagnoses.js";
import { kneeSurvey } from "../surveys/kneeSurvey.js";
import { kneeDiagnoses } from "../diagnoses/kneeDiagnoses.js";
import { lowBackSurvey } from "../surveys/lowBackSurvey.js";
import { lowBackDiagnoses } from "../diagnoses/lowBackDiagnoses.js";
import { neckSurvey } from "../surveys/neckSurvey.js";
import { neckDiagnoses } from "../diagnoses/neckDiagnoses.js";
import { shoulderSurvey } from "../surveys/shoulderSurvey.js";
import { shoulderDiagnoses } from "../diagnoses/shoulderDiagnoses.js";
import { upperBackSurvey } from "../surveys/upperBackSurvey.js";
import { upperBackDiagnoses } from "../diagnoses/upperBackDiagnoses.js";
import { wristSurvey } from "../surveys/wristSurvey.js";
import { wristDiagnoses } from "../diagnoses/wristDiagnoses.js";
import { interpretAnswers } from "../utils/surveyUtils.js";
import { followupSurvey } from "../surveys/followUpSurvey.js";

const surveyController = {
	surveys: {
		ankle: ankleSurvey,
		elbow: elbowSurvey,
		hip: hipSurvey,
		knee: kneeSurvey,
		lowBack: lowBackSurvey,
		neck: neckSurvey,
		shoulder: shoulderSurvey,
		upperBack: upperBackSurvey,
		wrist: wristSurvey,
		followup: followupSurvey,
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

		const diagnosesMapping = {
			ankle: ankleDiagnoses,
			elbow: elbowDiagnoses,
			hip: hipDiagnoses,
			knee: kneeDiagnoses,
			lowBack: lowBackDiagnoses,
			neck: neckDiagnoses,
			shoulder: shoulderDiagnoses,
			upperBack: upperBackDiagnoses,
			wrist: wristDiagnoses,
		};

		const diagnoses = diagnosesMapping[surveyId];
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
			console.log(`Final diagnosis: ${diagnoses[finalDiagnosis].name}`);
			return {
				diagnosis: diagnoses[finalDiagnosis].name,
				description: diagnoses[finalDiagnosis].description,
				exercises: diagnoses[finalDiagnosis].recommendedExercises,
			};
		}

		console.log("No clear diagnosis achieved, defaulting to general advice");
		return {
			diagnosis: "General advice",
			description: "Please consult a physician for a detailed diagnosis.",
			exercises: [],
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
