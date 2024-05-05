// import * as diagnosesMapping from "../diagnoses/index.js";
// import { NotFoundError } from "../utils/customError.js";
// import { interpretAnswers } from "../utils/surveyUtils.js";

// export const evaluateDiagnosis = (answers, surveyId, surveyQuestions) => {
// 	const diagnoses = diagnosesMapping[surveyId];
// 	if (!diagnoses) {
// 		throw new NotFoundError(
// 			`Diagnoser for undersøkelse ${surveyId} ble ikke funnet`,
// 		);
// 	}

// 	const symptoms = interpretAnswers(answers, surveyQuestions);

// 	const diagnosisScores = Object.keys(diagnoses).reduce((acc, diagnosis) => {
// 		acc[diagnosis] = 0;
// 		return acc;
// 	}, {});

// 	for (const symptom of symptoms) {
// 		for (const [diagnosis, { keySymptoms }] of Object.entries(diagnoses)) {
// 			if (keySymptoms.includes(symptom)) {
// 				diagnosisScores[diagnosis]++;
// 			}
// 		}
// 	}

// 	let høyesteScore = 0;
// 	let endeligDiagnose = "Ingen tydelig diagnose";

// 	for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
// 		if (score > høyesteScore) {
// 			høyesteScore = score;
// 			endeligDiagnose = diagnosis;
// 		}
// 	}

// 	if (høyesteScore >= 3) {
// 		return {
// 			diagnose: diagnoses[endeligDiagnose].name,
// 			beskrivelse: diagnoses[endeligDiagnose].description,
// 			øvelser: diagnoses[endeligDiagnose].recommendedExercises,
// 		};
// 	}

// 	return {
// 		diagnose: "Generell veiledning",
// 		beskrivelse: "Vennligst oppsøk lege for en detaljert diagnose.",
// 		øvelser: [],
// 	};
// };
