import { neckDiagnoses } from "../diagnoses/neckDiagnoses.js";
import { interpretAnswers } from "./surveyUtils.js";

const evaluateDiagnosis = (answers, questions, diagnoses = neckDiagnoses) => {
	const symptoms = interpretAnswers(answers, questions);
	const diagnosisScores = Object.keys(diagnoses).reduce((acc, diagnosis) => {
		acc[diagnosis] = 0;
		return acc;
	}, {});

	// Count scores based on symptoms present in diagnoses
	for (const symptom of symptoms) {
		for (const [diagnosis, { keySymptoms }] of Object.entries(diagnoses)) {
			if (keySymptoms.includes(symptom)) {
				diagnosisScores[diagnosis]++;
			}
		}
	}

	let highestScore = 0;
	let finalDiagnosisKey = "No clear diagnosis";
	for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
		if (score > highestScore) {
			highestScore = score;
			finalDiagnosisKey = diagnosis;
		}
	}

	if (highestScore >= 3) {
		return {
			diagnosis: diagnoses[finalDiagnosisKey].name,
			exercises: diagnoses[finalDiagnosisKey].recommendedExercises,
		};
	}

	return {
		diagnosis: "Ingen klar Diagnose",
		exercises: ["Generelle øvelser"],
	};
};

export { evaluateDiagnosis };
