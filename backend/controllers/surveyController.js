import { neckSurvey } from "../surveys/neckSurvey.js";
import { neckDiagnoses } from "../diagnoses/neckDiagnoses.js";
import { interpretAnswers } from "../utils/surveyUtils.js";

const surveyController = {
	surveys: {
		neck: neckSurvey,
	},

	evaluateDiagnosis: function (answers, surveyId) {
		const survey = this.surveys[surveyId];
		if (!survey) {
			throw new Error("Survey not found");
		}

		const diagnoses = survey.diagnoses;
		const symptoms = interpretAnswers(answers, survey.questions);
		const diagnosisScores = {};

		for (const diagnosis in diagnoses) {
			diagnosisScores[diagnosis] = 0;
		}

		for (const symptom of symptoms) {
			for (const [diagnosis, { keySymptoms }] of Object.entries(diagnoses)) {
				if (keySymptoms.includes(symptom)) {
					diagnosisScores[diagnosis]++;
				}
			}
		}

		let highestScore = 0;
		let finalDiagnosis = "No clear diagnosis";

		for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
			if (score > highestScore) {
				highestScore = score;
				finalDiagnosis = diagnosis;
			}
		}

		return highestScore >= 3
			? {
					diagnosis: neckDiagnoses[finalDiagnosis].name,
					exercises: neckDiagnoses[finalDiagnosis].recommendedExercises,
			  }
			: {
					diagnosis: "Ingen Klar Diagnose, Vennligst kontakt en behandler",
					exercises: ["Generelle nakkekomfortøvelser"],
			  };
	},
	getSurveyById: function (surveyId) {
		const survey = this.surveys[surveyId];
		if (!survey) {
			throw new Error("Survey not found");
		}
		return survey;
	},
};

export default surveyController;
