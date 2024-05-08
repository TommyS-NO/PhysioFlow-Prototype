import surveys from "../surveys/index.js";
import diagnoses from "../diagnoses/index.js";
import { interpretAnswers } from "../utils/surveyUtils.js";
import { NotFoundError, ValidationError } from "../utils/customError.js";

const surveyController = {
	surveys: surveys,

	evaluateDiagnosis: function (answers, surveyId) {
		const survey = this.surveys[surveyId];
		if (!survey) {
			throw new NotFoundError(`Undersøkelse ${surveyId} ikke funnet`);
		}

		const surveyDiagnoses = diagnoses[surveyId];
		if (!surveyDiagnoses) {
			throw new NotFoundError(`Diagnoser for ${surveyId} ikke funnet`);
		}

		const symptoms = interpretAnswers(answers, survey.questions);
		const diagnosisScores = {};
		for (const diagnosis in surveyDiagnoses) {
			diagnosisScores[diagnosis] = 0;
		}

		for (const symptom of symptoms) {
			for (const [diagnosis, { keySymptoms }] of Object.entries(
				surveyDiagnoses,
			)) {
				if (keySymptoms.includes(symptom)) {
					diagnosisScores[diagnosis]++;
				}
			}
		}

		let highestScore = 0;
		let finalDiagnosis = "Ingen klar diagnose";

		for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
			if (score > highestScore) {
				highestScore = score;
				finalDiagnosis = diagnosis;
			}
		}

		if (highestScore >= 3) {
			return {
				diagnosis: surveyDiagnoses[finalDiagnosis].name,
				description: surveyDiagnoses[finalDiagnosis].description,
				exercises: surveyDiagnoses[finalDiagnosis].recommendedExercises,
			};
		}

		return {
			diagnosis: "Generelt råd",
			description: "Vennligst konsulter en lege for en detaljert diagnose.",
			exercises: [],
		};
	},

	getSurveyById: function (surveyId) {
		const survey = this.surveys[surveyId];
		if (!survey) {
			throw new NotFoundError(`Undersøkelse ${surveyId} ikke funnet`);
		}
		return survey;
	},
};

export default surveyController;
