import { Firestore } from "@google-cloud/firestore";
import { NotFoundError, ValidationError } from "../utils/customError.js";

// Simulerte databaseoppføringer for øvelser
import { recommendedNeckExercises } from "../exercises/recommendedNeckExercises.js";
import { recommendedAnkleExercises } from "../exercises/recommendedAnkelExercises.js";
import { recommendedElbowExercises } from "../exercises/recommendedElbowExercises.js";
import { recommendedKneeExercises } from "../exercises/recommendedKneeExercises.js";
import { recommendedLowBackExercises } from "../exercises/recommendedLowBackExercise.js";
import { recommendedUpperBackExercises } from "../exercises/recommendedUpperBackExercises.js";
import { recommendedWristExercises } from "../exercises/recommendedWristExercises.js";
import { recommendedShoulderExercises } from "../exercises/recommendedShoulderExercises.js";
import { recommendedHipExercises } from "../exercises/recommendedHipExercises.js";

const db = new Firestore();

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

export const getAllExercises = (req, res, next) => {
	try {
		if (!Object.keys(allExercises).length) {
			throw new NotFoundError("Ingen øvelser funnet");
		}
		res.json(allExercises);
	} catch (error) {
		next(error);
	}
};

export const getExerciseDetails = (req, res, next) => {
	try {
		const { exercises } = req.body;

		if (!Array.isArray(exercises) || exercises.length === 0) {
			throw new ValidationError("Listen over øvelser er ugyldig eller tom");
		}

		const details = exercises.map((name) => allExercises[name]).filter(Boolean);

		if (details.length === 0) {
			throw new NotFoundError("Ingen av øvelsene ble funnet");
		}

		res.json(details);
	} catch (error) {
		next(error);
	}
};
