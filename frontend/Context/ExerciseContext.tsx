import React, { createContext, useState, ReactNode, useCallback } from "react";
import { surveyService } from "../Services/SurveyService";

type Exercise = {
	id: string;
	name: string;
	category: string;
	description: string;
	image: string;
};

interface ExerciseContextType {
	exercises: Exercise[];
	selectedExercises: Exercise[];
	addExercise: (exercise: Exercise) => void;
	removeExercise: (exerciseId: string) => void;
	toggleExerciseSelected: (exercise: Exercise) => void;
	loading: boolean;
	error: string | null;
	fetchExercises: () => Promise<void>;
}

const defaultContextValue: ExerciseContextType = {
	exercises: [],
	selectedExercises: [],
	addExercise: () => {},
	removeExercise: () => {},
	toggleExerciseSelected: () => {},
	loading: false,
	error: null,
	fetchExercises: async () => {},
};

export const ExerciseContext =
	createContext<ExerciseContextType>(defaultContextValue);

interface ExerciseProviderProps {
	children: ReactNode;
}

export function ExerciseProvider({ children }: ExerciseProviderProps) {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const addExercise = useCallback((newExercise: Exercise) => {
		setSelectedExercises((prevExercises) => {
			if (!prevExercises.some((exercise) => exercise.id === newExercise.id)) {
				return [...prevExercises, newExercise];
			}
			return prevExercises;
		});
	}, []);

	const removeExercise = useCallback((exerciseId: string) => {
		setSelectedExercises((prevExercises) =>
			prevExercises.filter((exercise) => exercise.id !== exerciseId),
		);
	}, []);

	const toggleExerciseSelected = useCallback((exercise: Exercise) => {
		setSelectedExercises((prevExercises) => {
			if (prevExercises.some((e) => e.id === exercise.id)) {
				return prevExercises.filter((e) => e.id !== exercise.id);
			}
			return [...prevExercises, exercise];
		});
	}, []);

	const fetchExercises = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedExercises = await surveyService.getAllExercises();
			setExercises(fetchedExercises);
		} catch (e) {
			setError("Could not fetch exercises");
		}
		setLoading(false);
	}, []);

	return (
		<ExerciseContext.Provider
			value={{
				exercises,
				selectedExercises,
				addExercise,
				removeExercise,
				toggleExerciseSelected,
				loading,
				error,
				fetchExercises,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
}
