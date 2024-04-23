import React, {
	createContext,
	useState,
	ReactNode,
	useCallback,
	useContext,
} from "react";
import { surveyService } from "../Services/SurveyService";

// Type definitions for Exercise and Context
export type Exercise = {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
};

export interface ExerciseContextType {
	exercises: Exercise[];
	selectedExercises: Exercise[];
	addExercise: (exercise: Exercise) => void;
	removeExercise: (exerciseId: string) => void;
	toggleExerciseSelected: (exercise: Exercise) => void;
	loading: boolean;
	error: string | null;
	fetchExercises: () => Promise<void>;
}

export type ExerciseApiData = {
	description: string;
	image: string;
	category?: string;
};

type AllExercisesApiResponse = Record<string, ExerciseApiData>;

// Default context value with empty implementations and initial state
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

export const useExercises = () => useContext(ExerciseContext);

interface ExerciseProviderProps {
	children: ReactNode;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
	children,
}) => {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
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
			const allExercisesResponse: AllExercisesApiResponse =
				await surveyService.getAllExercises();
			const exercisesArray: Exercise[] = Object.entries(
				allExercisesResponse,
			).map(([name, details]) => ({
				id: name.toLowerCase().replace(/\s+/g, "_"),
				name: name,
				description: details.description,
				image: details.image,
				category: details.category ?? "Uncategorized",
			}));
			setExercises(exercisesArray);
		} catch (e) {
			setError("Could not fetch exercises");
			console.error(e);
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
};
