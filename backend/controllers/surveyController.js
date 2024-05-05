import * as surveysImport from "../surveys/index.js";
import * as diagnosesMappingImport from "../diagnoses/index.js";
import { interpretAnswers } from "../utils/surveyUtils.js";
import { NotFoundError, ValidationError } from "../utils/customError.js";

const surveys = surveysImport.default;
const diagnosesMapping = diagnosesMappingImport.default;

const evaluateDiagnosis = (answers, surveyId) => {
	const survey = surveys[surveyId];
	if (!survey) {
		throw new NotFoundError(`Undersøkelse med ID ${surveyId} ble ikke funnet`);
	}

	const diagnoses = diagnosesMapping[surveyId];
	if (!diagnoses) {
		throw new NotFoundError(
			`Diagnosekartlegging for undersøkelse ${surveyId} ble ikke funnet`,
		);
	}

	const symptoms = interpretAnswers(answers, survey.questions);

	//  score for diagnoser
	const diagnosisScores = Object.keys(diagnoses).reduce((acc, diagnosis) => {
		acc[diagnosis] = 0;
		return acc;
	}, {});

	// Oppdater score basert på symptomer
	for (const symptom of symptoms) {
		for (const [diagnosis, { keySymptoms }] of Object.entries(diagnoses)) {
			if (keySymptoms.includes(symptom)) {
				diagnosisScores[diagnosis]++;
			}
		}
	}

	let høyesteScore = 0;
	let endeligDiagnose = "Ingen tydelig diagnose";

	for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
		if (score > høyesteScore) {
			høyesteScore = score;
			endeligDiagnose = diagnosis;
		}
	}

	if (høyesteScore >= 3) {
		return {
			diagnose: diagnoses[endeligDiagnose].name,
			beskrivelse: diagnoses[endeligDiagnose].description,
			øvelser: diagnoses[endeligDiagnose].recommendedExercises,
		};
	}

	return {
		diagnose: "Generell veiledning",
		beskrivelse: "Vennligst oppsøk lege for en detaljert diagnose.",
		øvelser: [],
	};
};

const getSurveyById = (surveyId) => {
	const survey = surveys[surveyId];
	if (!survey) {
		throw new NotFoundError(`Undersøkelse med ID ${surveyId} ble ikke funnet`);
	}
	return survey;
};

export default { evaluateDiagnosis, getSurveyById };
