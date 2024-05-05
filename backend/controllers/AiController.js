import openai from "../openAI/openAIConfig.js";
import surveyController from "./surveyController.js";
import allExercises from "./exerciseController.js";

const interpretUserRequest = async (question) => {
	const lowerCaseQuestion = question.toLowerCase();
	const focusAreas = Object.keys(surveyController.surveys);

	const focusAreaFound = focusAreas.find((area) =>
		lowerCaseQuestion.includes(area.toLowerCase()),
	);

	if (focusAreaFound) {
		return {
			focusArea: focusAreaFound,
			action: lowerCaseQuestion.includes("øvelse") ? "exercise" : "diagnosis",
		};
	}

	return { focusArea: null, action: null };
};

export const getAIResponseWithLocalData = async (req, res, next) => {
	const { question } = req.body;

	const { focusArea, action } = await interpretUserRequest(question);

	try {
		if (focusArea && action) {
			switch (action) {
				case "diagnosis": {
					const diagnosis = surveyController.evaluateDiagnosis([], focusArea);
					console.log("Diagnosis:", diagnosis);
					res.json({ diagnosis });
					break;
				}
				case "exercise": {
					const exercises = allExercises[focusArea];
					console.log("Exercises:", exercises);
					res.json({ exercises });
					break;
				}
				default:
					res.json({
						answer:
							"Jeg kan dessverre ikke svare på det. Kan du spørre om noe annet relatert til plager eller øvelser?",
					});
					break;
			}
		} else {
			const completion = await openai.createCompletion({
				model: "gpt-3.5-turbo",
				prompt: question,
				max_tokens: 750,
				temperature: 0.7,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0.6,
				stop: ["\n"],
			});

			const aiResponse = completion.data.choices[0].text.trim();

			const responseIsAboutFocusArea = focusAreas.some((area) =>
				aiResponse.toLowerCase().includes(area.toLowerCase()),
			);

			if (responseIsAboutFocusArea) {
				res.json({ answer: aiResponse });
			} else {
				res.json({
					answer:
						"Jeg kan dessverre ikke svare på det. Kan du spørre om noe annet relatert til plager eller øvelser?",
				});
			}
		}
	} catch (error) {
		next(error);
	}
};
