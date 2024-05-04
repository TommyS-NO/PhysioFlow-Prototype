import { ValidationError } from "./customError.js";

const interpretAnswers = (answers, questions) => {
	if (!answers || !questions) {
		throw new ValidationError("Manglende svar eller spørsmål for analyse");
	}

	const symptoms = [];

	for (const question of questions) {
		const answer = answers[question.id];
		if (
			answer &&
			question.relatedSymptoms &&
			question.relatedSymptoms[answer]
		) {
			symptoms.push(...question.relatedSymptoms[answer]);
		}
	}

	return symptoms;
};

export { interpretAnswers };
