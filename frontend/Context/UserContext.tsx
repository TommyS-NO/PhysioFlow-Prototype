import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
	useCallback,
} from "react";
import { collection, addDoc } from "firebase/firestore";
import { Exercise } from "./ExerciseContext";
import { db } from "../Services/Firebase/FirebaseConfig";

// Typescript-typer og interfaces
interface UserProfile {
	username?: string;
	email: string;
	gender?: "male" | "female" | "unspecified";
	height?: number;
	weight?: number;
	birthday?: string;
	profileImageUrl?: string;
}

interface UserState {
	isLoggedIn: boolean;
	token: string | null;
	userDetails: UserProfile | null;
	userId: string | null;
}

interface FollowupAnswers {
	painIntensity: number;
	repetitionsCompleted: number;
	difficultyLevel: number;
	timeTaken: number;
	generalAbility: number;
}

type UserAction =
	| {
			type: "LOGIN";
			token: string;
			userId: string;
			userDetails: Partial<UserProfile>;
	  }
	| { type: "LOGOUT" }
	| { type: "REGISTER"; userDetails: UserProfile }
	| { type: "UPDATE_USER_DETAILS"; details: Partial<UserProfile> }
	| {
			type: "COMPLETE_EXERCISE";
			userId: string;
			exercise: Exercise;
			answers: FollowupAnswers;
	  };

const initialState: UserState = {
	isLoggedIn: false,
	token: null,
	userDetails: null,
	userId: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				token: action.token,
				userId: action.userId,
				userDetails: { ...state.userDetails, ...action.userDetails },
			};
		case "LOGOUT":
			return initialState;
		case "REGISTER":
			return {
				...state,
				userDetails: action.userDetails,
			};
		case "UPDATE_USER_DETAILS":
			return {
				...state,
				userDetails: { ...state.userDetails, ...action.details },
			};
		default:
			return state;
	}
};

const UserContext = createContext<{
	state: UserState;
	dispatch: Dispatch<UserAction>;
	completeExercise: (
		userId: string,
		exercise: Exercise,
		answers: FollowupAnswers,
	) => Promise<void>;
}>({
	state: initialState,
	dispatch: () => null,
	completeExercise: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	// Legg til alle nye funksjoner her
	const completeExercise = useCallback(
		async (userId: string, exercise: Exercise, answers: FollowupAnswers) => {
			dispatch({ type: "COMPLETE_EXERCISE", userId, exercise, answers });
			try {
				await addDoc(collection(db, "users", userId, "completedExercises"), {
					exerciseId: exercise.id,
					...answers,
					completedAt: new Date(),
				});
			} catch (error) {
				console.error("Error saving completed exercise:", error);
			}
		},
		[],
	);

	return (
		<UserContext.Provider value={{ state, dispatch, completeExercise }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
