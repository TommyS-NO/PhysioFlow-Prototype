import React, {
	createContext,
	useState,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
} from "react";
import { apiService } from "../Services/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Exercise = {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	status?: "pending" | "completed";
};

export interface ExerciseContextType {
	exercises: Exercise[];
	selectedExercises: Exercise[];
	addExercise: (exercise: Exercise) => void;
	removeExercise: (exerciseId: string) => void;
	toggleExerciseSelected: (exercise: Exercise) => void;
	updateExerciseStatus: (
		exerciseId: string,
		status: "pending" | "completed",
	) => void;
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

const defaultContextValue: ExerciseContextType = {
	exercises: [],
	selectedExercises: [],
	addExercise: () => {},
	removeExercise: () => {},
	toggleExerciseSelected: () => {},
	updateExerciseStatus: () => {},
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

	const updateAsyncStorage = useCallback(
		async (selectedExercises: Exercise[]) => {
			try {
				const jsonValue = JSON.stringify(selectedExercises);
				await AsyncStorage.setItem("selectedExercises", jsonValue);
			} catch (e) {
				console.error("Error saving selected exercises:", e);
			}
		},
		[],
	);
	useEffect(() => {
		const loadSelectedExercises = async () => {
			try {
				const storedSelectedExercises =
					await AsyncStorage.getItem("selectedExercises");
				if (storedSelectedExercises) {
					setSelectedExercises(JSON.parse(storedSelectedExercises));
				}
			} catch (e) {
				console.error("Error loading selected exercises:", e);
			}
		};

		loadSelectedExercises();
	}, []);

	useEffect(() => {
		updateAsyncStorage(selectedExercises);
	}, [selectedExercises, updateAsyncStorage]);

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

	const updateExerciseStatus = useCallback(
		(exerciseId: string, status: "pending" | "completed") => {
			setSelectedExercises((prevExercises) =>
				prevExercises.map((exercise) =>
					exercise.id === exerciseId
						? { ...exercise, status: status }
						: exercise,
				),
			);
		},
		[],
	);

	const fetchExercises = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const allExercisesResponse: AllExercisesApiResponse =
				await apiService.getAllExercises();
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
				updateExerciseStatus,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};
