import React, {
	createContext,
	useReducer,
	useContext,
	useCallback,
	useEffect,
} from "react";
import {
	addUserExercise,
	deleteUserExercise,
	fetchUserDetailsFromFirestore,
	updateUserExerciseStatus,
} from "../Services/Firebase/FirebaseConfig";
import { getAuth } from "firebase/auth";

export type Exercise = {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	status?: "pending" | "completed";
	completedAt?: string;
};

interface ExerciseState {
	userExercises: Exercise[];
	completedExercises: Exercise[];
	loading: boolean;
	error: string | null;
}

type ExerciseAction =
	| { type: "SET_USER_EXERCISES"; payload: Exercise[] }
	| { type: "SET_COMPLETED_EXERCISES"; payload: Exercise[] }
	| { type: "ADD_EXERCISE"; payload: Exercise }
	| { type: "REMOVE_EXERCISE"; id: string }
	| {
			type: "UPDATE_EXERCISE_STATUS";
			id: string;
			status: "pending" | "completed";
			completedAt?: string;
	  }
	| { type: "SET_LOADING"; loading: boolean }
	| { type: "SET_ERROR"; error: string | null };

const initialState: ExerciseState = {
	userExercises: [],
	completedExercises: [],
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
		case "SET_USER_EXERCISES":
			return { ...state, userExercises: action.payload, loading: false };
		case "SET_COMPLETED_EXERCISES":
			return { ...state, completedExercises: action.payload, loading: false };
		case "ADD_EXERCISE":
			return {
				...state,
				userExercises: [...state.userExercises, action.payload],
			};
		case "REMOVE_EXERCISE":
			return {
				...state,
				userExercises: state.userExercises.filter((ex) => ex.id !== action.id),
			};
		case "UPDATE_EXERCISE_STATUS": {
			const updatedUserExercises = state.userExercises.map((ex) =>
				ex.id === action.id
					? { ...ex, status: action.status, completedAt: action.completedAt }
					: ex,
			);
			const completedExercise = updatedUserExercises.find(
				(ex) => ex.id === action.id && action.status === "completed",
			);
			if (completedExercise) {
				return {
					...state,
					userExercises: updatedUserExercises.filter(
						(ex) => ex.id !== action.id,
					),
					completedExercises: [...state.completedExercises, completedExercise],
				};
			}
			return { ...state, userExercises: updatedUserExercises };
		}
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		case "SET_ERROR":
			return { ...state, error: action.error };
		default:
			return state;
	}
};

export const ExerciseProvider = ({ children }) => {
	const [state, dispatch] = useReducer(exerciseReducer, initialState);

	const fetchExercises = useCallback(async () => {
		dispatch({ type: "SET_LOADING", loading: true });
		try {
			const userId = getAuth().currentUser?.uid;
			if (userId) {
				const { completedExercises, userExercises } =
					await fetchUserDetailsFromFirestore(userId);
				dispatch({ type: "SET_USER_EXERCISES", payload: userExercises });
				dispatch({
					type: "SET_COMPLETED_EXERCISES",
					payload: completedExercises,
				});
			} else {
				throw new Error("User not authenticated");
			}
		} catch (error) {
			dispatch({
				type: "SET_ERROR",
				error: error.message || "Failed to fetch exercises",
			});
		}
	}, []);

	const addExercise = useCallback(async (exercise: Exercise) => {
		try {
			const userId = getAuth().currentUser?.uid;
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
	}, []);

	const removeExercise = useCallback(async (exerciseId: string) => {
		try {
			const userId = getAuth().currentUser?.uid;
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
	}, []);

	const updateExerciseStatus = useCallback(
		async (exerciseId: string, status: "pending" | "completed") => {
			try {
				const userId = getAuth().currentUser?.uid;
				if (userId) {
					const completedAt =
						status === "completed" ? new Date().toISOString() : undefined;
					await updateUserExerciseStatus(userId, exerciseId, status);
					dispatch({
						type: "UPDATE_EXERCISE_STATUS",
						id: exerciseId,
						status,
						completedAt,
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
		[],
	);

	// useEffect(() => {
	// 	fetchExercises();
	// }, []); // Fetch exercises only once on mount

	return (
		<ExerciseContext.Provider
			value={{
				state,
				dispatch,
				addExercise,
				removeExercise,
				updateExerciseStatus,
				fetchExercises,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};

export const useExercises = () => useContext(ExerciseContext);
