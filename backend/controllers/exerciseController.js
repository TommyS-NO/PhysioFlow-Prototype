import { recommendedNeckExercises } from "../exercises/recommendedNeckExercises.js";

export const getExerciseDetails = (req, res) => {
	try {
		const { exercises } = req.body;
		const details = exercises.map((name) => recommendedNeckExercises[name]);
		res.json(details);
	} catch (error) {
		console.error("Error fetching exercise details:", error);
		res.status(400).send("Could not fetch exercise details");
	}
};
