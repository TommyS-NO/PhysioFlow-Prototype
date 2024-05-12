import React, {
	createContext,
	useReducer,
	useContext,
	useCallback,
	useEffect,
} from "react";
import {
	auth,
	addUserExercise,
	deleteUserExercise,
	updateUserExerciseStatus,
	fetchUserDetailsFromFirestore,
} from "../Services/Firebase/FirebaseConfig";

interface Exercise {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	status?: "pending" | "completed";
	completedAt?: string;
}

interface ExerciseState {
	exercises: Exercise[];
	loading: boolean;
	error: string | null;
}

interface ExerciseProviderProps {
	children: React.ReactNode;
}

type ExerciseAction =
	| { type: "SET_EXERCISES"; payload: Exercise[] }
	| { type: "ADD_EXERCISE"; payload: Exercise }
	| { type: "REMOVE_EXERCISE"; id: string }
	| {
			type: "UPDATE_EXERCISE_STATUS";
			id: string;
			status: "pending" | "completed";
	  }
	| { type: "SET_LOADING"; loading: boolean }
	| { type: "SET_ERROR"; error: string | null };

const initialState: ExerciseState = {
	exercises: [],
	loading: false,
	error: null,
};

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

const exerciseReducer = (
	state: ExerciseState,
	action: ExerciseAction,
): ExerciseState => {
	switch (action.type) {
		case "SET_EXERCISES":
			return { ...state, exercises: action.payload, loading: false };
		case "ADD_EXERCISE":
			return { ...state, exercises: [...state.exercises, action.payload] };
		case "REMOVE_EXERCISE":
			return {
				...state,
				exercises: state.exercises.filter((ex) => ex.id !== action.id),
			};
		case "UPDATE_EXERCISE_STATUS":
			return {
				...state,
				exercises: state.exercises.map((ex) =>
					ex.id === action.id ? { ...ex, status: action.status } : ex,
				),
			};
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		case "SET_ERROR":
			return { ...state, error: action.error };
		default:
			return state;
	}
};

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(exerciseReducer, initialState);

	const fetchExercises = useCallback(async () => {
		dispatch({ type: "SET_LOADING", loading: true });
		if (!auth.currentUser) {
			console.log("No authenticated user found.");
			dispatch({ type: "SET_ERROR", error: "User not authenticated" });
			return;
		}
		try {
			const userId = auth.currentUser.uid;
			console.log("Fetching exercises for user:", userId);

			const details = await fetchUserDetailsFromFirestore(userId);
			console.log("Details fetched:", details);

			const allExercises = [
				...details.userExercises,
				...details.completedExercises.map((ex) => ({
					...ex,
					status: "completed",
				})),
			];
			console.log("All exercises compiled:", allExercises);

			dispatch({ type: "SET_EXERCISES", payload: allExercises });
			dispatch({ type: "SET_LOADING", loading: false });
		} catch (error) {
			console.error("Error fetching exercises:", error);
			dispatch({ type: "SET_ERROR", error: error.message });
			dispatch({ type: "SET_LOADING", loading: false });
		}
	}, []);

	useEffect(() => {
		fetchExercises();
	}, [fetchExercises]);

	return (
		<ExerciseContext.Provider
			value={{
				state,
				dispatch,
				addExercise: async (exercise: Exercise) => {
					try {
						const userId = auth.currentUser?.uid;
						if (userId) {
							const docRef = await addUserExercise(userId, exercise);
							dispatch({
								type: "ADD_EXERCISE",
								payload: { ...exercise, id: docRef.id },
							});
						} else {
							throw new Error("User not authenticated");
						}
					} catch (error) {
						dispatch({
							type: "SET_ERROR",
							error: error.message || "Failed to add exercise",
						});
					}
				},
				removeExercise: async (exerciseId: string) => {
					try {
						const userId = auth.currentUser?.uid;
						if (userId) {
							await deleteUserExercise(userId, exerciseId);
							dispatch({ type: "REMOVE_EXERCISE", id: exerciseId });
						} else {
							throw new Error("User not authenticated");
						}
					} catch (error) {
						dispatch({
							type: "SET_ERROR",
							error: error.message || "Failed to remove exercise",
						});
					}
				},
				updateExerciseStatus: async (
					exerciseId: string,
					status: "pending" | "completed",
				) => {
					try {
						const userId = auth.currentUser?.uid;
						if (userId) {
							await updateUserExerciseStatus(userId, exerciseId, status);
							dispatch({
								type: "UPDATE_EXERCISE_STATUS",
								id: exerciseId,
								status,
							});
						} else {
							throw new Error("User not authenticated");
						}
					} catch (error) {
						dispatch({
							type: "SET_ERROR",
							error: error.message || "Failed to update exercise status",
						});
					}
				},
				fetchExercises,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};

export const useExercises = () => useContext(ExerciseContext);
