import { createContext, useContext } from "react";
import { ExerciseState, ExerciseAction, initialState } from "./exerciseReducer";
import { Exercise } from "./exerciseTypes";

const ExerciseContext = createContext<{
	state: ExerciseState;
	dispatch: React.Dispatch<ExerciseAction>;
	addExercise: (exercise: Exercise) => Promise<void>;
	removeExercise: (exerciseId: string) => Promise<void>;
	updateExerciseStatus: (
		exerciseId: string,
		status: "pending" | "completed",
	) => Promise<void>;
	fetchExercises: () => Promise<void>;
}>({
	state: initialState,
	dispatch: () => undefined,
	addExercise: async () => {},
	removeExercise: async () => {},
	updateExerciseStatus: async () => {},
	fetchExercises: async () => {},
});

export const useExercises = () => useContext(ExerciseContext);

export default ExerciseContext;
