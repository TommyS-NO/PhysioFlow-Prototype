import { recommendedNeckExercises } from "../exercises/recommendedNeckExercises.js";
import { recommendedAnkleExercises } from "../exercises/recommendedAnkelExercises.js";
import { recommendedElbowExercises } from "../exercises/recommendedelbowExercises.js";
import { recommendedKneeExercises } from "../exercises/recommendedKneeExercises.js";
import { recommendedLowBackExercises } from "../exercises/recommendedLowBackExercise.js";
import { recommendedUpperBackExercises } from "../exercises/recommendedUpperBackExercises.js";
import { recommendedWristExercises } from "../exercises/recommendedWristExercises.js";
import { recommendedShoulderExercises } from "../exercises/recommendedShoulderExercises.js";
import { recommendedHipExercises } from "../exercises/recommendedHipExercises.js";

const addCategoryToExercises = (exercises, category) => {
	return Object.entries(exercises).reduce((result, [id, details]) => {
		result[id] = { ...details, category };
		return result;
	}, {});
};

const allExercises = {
	...addCategoryToExercises(recommendedNeckExercises, "Nakke"),
	...addCategoryToExercises(recommendedAnkleExercises, "Ankel"),
	...addCategoryToExercises(recommendedElbowExercises, "Albue"),
	...addCategoryToExercises(recommendedKneeExercises, "Kne"),
	...addCategoryToExercises(recommendedLowBackExercises, "Lav Rygg"),
	...addCategoryToExercises(recommendedUpperBackExercises, "Øvre Rygg"),
	...addCategoryToExercises(recommendedWristExercises, "Håndledd"),
	...addCategoryToExercises(recommendedShoulderExercises, "Skulder"),
	...addCategoryToExercises(recommendedHipExercises, "Hofte"),
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
export default allExercises;
