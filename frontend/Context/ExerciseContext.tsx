import React, { createContext, useState, ReactNode, useEffect } from "react";
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
}

const defaultContextValue: ExerciseContextType = {
	exercises: [],
	selectedExercises: [],
	addExercise: () => {},
	removeExercise: () => {},
	toggleExerciseSelected: () => {},
};

export const ExerciseContext =
	createContext<ExerciseContextType>(defaultContextValue);

interface ExerciseProviderProps {
	children: ReactNode;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
	children,
}) => {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

	const addExercise = (newExercise: Exercise) => {
		setSelectedExercises((prevExercises) => {
			if (!prevExercises.some((exercise) => exercise.id === newExercise.id)) {
				return [...prevExercises, newExercise];
			}
			return prevExercises;
		});
	};

	const removeExercise = (exerciseId: string) => {
		setSelectedExercises((prevExercises) =>
			prevExercises.filter((exercise) => exercise.id !== exerciseId),
		);
	};

	const toggleExerciseSelected = (exercise: Exercise) => {
		setSelectedExercises((prevExercises) => {
			if (prevExercises.some((e) => e.id === exercise.id)) {
				return prevExercises.filter((e) => e.id !== exercise.id);
			}
			return [...prevExercises, exercise];
		});
	};

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await surveyService.getAllExercises();
			setExercises(exercises);
		};
		fetchExercises();
	}, []);

	return (
		<ExerciseContext.Provider
			value={{
				exercises,
				selectedExercises,
				addExercise,
				removeExercise,
				toggleExerciseSelected,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};
