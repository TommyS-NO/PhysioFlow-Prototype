import React, { createContext, useState, useContext, ReactNode } from "react";
type Exercise = {
	id: string;
	name: string;
	category: string;
	description: string;
};

interface ExerciseContextType {
	selectedExercises: Exercise[];
	addExercise: (exercise: Exercise) => void;
	removeExercise: (exerciseId: string) => void;
}

export const ExerciseContext = createContext<ExerciseContextType>({
	selectedExercises: [],
	addExercise: () => {},
	removeExercise: () => {},
});

export const useExercises = () => useContext(ExerciseContext);

interface ExerciseProviderProps {
	children: ReactNode;
}

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

	const addExercise = (newExercise: Exercise) => {
		setSelectedExercises((prevExercises) => [...prevExercises, newExercise]);
	};

	const removeExercise = (exerciseId: string) => {
		setSelectedExercises((prevExercises) =>
			prevExercises.filter((exercise) => exercise.id !== exerciseId),
		);
	};

	return (
		<ExerciseContext.Provider
			value={{
				selectedExercises,
				addExercise,
				removeExercise,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};
