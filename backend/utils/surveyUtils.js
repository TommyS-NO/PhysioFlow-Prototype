const interpretAnswers = (answers, questions) => {
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
