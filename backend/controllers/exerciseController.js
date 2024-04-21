import { recommendedNeckExercises } from "../exercises/recommendedNeckExercises.js";
import { recommendedAnkleExercises } from "../exercises/recommendedAnkelExercises.js";
import { recommendedElbowExercises } from "../exercises/recommendedelbowExercises.js";
import { recommendedKneeExercises } from "../exercises/recommendedKneeExercises.js";
import { recommendedLowBackExercises } from "../exercises/recommendedLowBackExercise.js";
import { recommendedUpperBackExercises } from "../exercises/recommendedUpperBackExercises.js";
import { recommendedWristExercises } from "../exercises/recommendedWristExercises.js";
import { recommendedShoulderExercises } from "../exercises/recommendedShoulderExercises.js";
import { recommendedHipExercises } from "../exercises/recommendedHipExercises.js";

const allExercises = {
	...recommendedNeckExercises,
	...recommendedAnkleExercises,
	...recommendedElbowExercises,
	...recommendedKneeExercises,
	...recommendedLowBackExercises,
	...recommendedUpperBackExercises,
	...recommendedWristExercises,
	...recommendedShoulderExercises,
	...recommendedHipExercises,
};

export const getAllExercises = (req, res) => {
	try {
		res.json(allExercises);
	} catch (error) {
		console.error("Error fetching all exercises:", error);
		res.status(400).send("Could not fetch all exercises");
	}
};

export const getExerciseDetails = (req, res) => {
	try {
		const { exercises } = req.body;
		const details = exercises.map((name) => {
			const exercise = allExercises[name];
			if (!exercise) {
				console.error("Exercise not found:", name);
				return null;
			}
			return exercise;
		});
		res.json(details);
	} catch (error) {
		console.error("Error fetching exercise details:", error);
		res.status(400).send("Could not fetch exercise details");
	}
};
