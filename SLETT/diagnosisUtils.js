// import { ValidationError } from "./customError.js";

// export const evaluateDiagnosis = (answers, questions, diagnoses) => {
// 	if (!answers || !questions || !diagnoses) {
// 		throw new ValidationError(
// 			"Manglende input-data for evaluering av diagnose",
// 			{ answers, questions, diagnoses },
// 		);
// 	}

// 	const symptoms = interpretAnswers(answers, questions);
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

// 	let highestScore = 0;
// 	let finalDiagnosisKey = "Ingen klar diagnose";
// 	for (const [diagnosis, score] of Object.entries(diagnosisScores)) {
// 		if (score > highestScore) {
// 			highestScore = score;
// 			finalDiagnosisKey = diagnosis;
// 		}
// 	}

// 	if (highestScore >= 3) {
// 		return {
// 			diagnosis: diagnoses[finalDiagnosisKey].name,
// 			exercises: diagnoses[finalDiagnosisKey].recommendedExercises,
// 		};
// 	}

// 	return {
// 		diagnosis: "Ingen klar diagnose",
// 		exercises: ["Generelle øvelser"],
// 	};
// };
