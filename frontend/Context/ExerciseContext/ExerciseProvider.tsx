import React, { useReducer, useCallback } from "react";
import ExerciseContext from "./ExerciseContext";
import exerciseReducer, { initialState } from "./exerciseReducer";
import {
	addUserExercise,
	deleteUserExercise,
	fetchUserDetailsFromFirestore,
	updateUserExerciseStatus,
} from "../../Services/Firebase/FirebaseConfig";
import { getAuth } from "firebase/auth";
import { Exercise } from "./exerciseTypes";

interface ExerciseProviderProps {
	children: React.ReactNode;
}

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
	children,
}) => {
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

export default ExerciseProvider;
