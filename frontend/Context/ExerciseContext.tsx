import React, { createContext, useState, ReactNode } from "react";

type Exercise = {
	id: string;
	name: string;
	category: string;
	description: string;
	image: string;
};

interface ExerciseContextType {
	selectedExercises: Exercise[];
	addExercise: (exercise: Exercise) => void;
	removeExercise: (exerciseId: string) => void;
	toggleExerciseSelected: (exercise: Exercise) => void;
}

const defaultContextValue: ExerciseContextType = {
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

	return (
		<ExerciseContext.Provider
			value={{
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
