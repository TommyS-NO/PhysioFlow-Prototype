import { recommendedNeckExercises } from "../exercises/recommendedNeckExercises.js";
import { recommendedAnkleExercises } from "../exercises/recommendedAnkelExercises.js";
import { recommendedElbowExercises } from "../exercises/recommendedelbowExercises.js";
import { recommendedKneeExercises } from "../exercises/recommendedKneeExercises.js";
import { recommendedLowBackExercises } from "../exercises/recommendedLowBackExercise.js";
import { recommendedUpperBackExercises } from "../exercises/recommendedUpperBackExercises.js";
import { recommendedWristExercises } from "../exercises/recommendedWristExercises.js";

const allExercises = {
	...recommendedNeckExercises,
	...recommendedAnkleExercises,
	...recommendedElbowExercises,
	...recommendedKneeExercises,
	...recommendedLowBackExercises,
	...recommendedUpperBackExercises,
	...recommendedWristExercises,
};

export const getExerciseDetails = (req, res) => {
	try {
		const { exercises } = req.body;
		const details = exercises.map((name) => allExercises[name]);
		res.json(details);
	} catch (error) {
		console.error("Error fetching exercise details:", error);
		res.status(400).send("Could not fetch exercise details");
	}
};
