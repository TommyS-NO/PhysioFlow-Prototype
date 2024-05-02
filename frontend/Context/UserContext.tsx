import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	useCallback,
} from "react";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, deleteUser as firebaseDeleteUser } from "firebase/auth";
import { db } from "../Services/Firebase/FirebaseConfig";

// import { Exercise } from "./ExerciseContext";
import { apiService } from "../Services/ApiService";

// User profile interface
interface UserProfile {
	username?: string;
	email: string;
	gender?: "male" | "female" | "unspecified";
	height?: number;
	weight?: number;
	birthday?: string;
	profileImageUrl?: string;
}

// User state interface
interface UserState {
	isLoggedIn: boolean;
	token: string | null;
	userDetails: UserProfile | null;
	userId: string | null;
	completedExercises: CompletedExercise[];
	lastCompletedExercise: CompletedExercise | null;
}

// Follow-up answers interface
interface FollowupAnswers {
	painIntensity: number;
	repetitionsCompleted: number;
	difficultyLevel: number;
	timeTaken: number;
	generalAbility: number;
}

// Completed exercise type
type CompletedExercise = {
	exerciseId: string;
	answers: FollowupAnswers;
	completedAt: Date;
};

// User action types
type UserAction = {
	type:
		| "LOGIN"
		| "LOGOUT"
		| "REGISTER"
		| "UPDATE_USER_DETAILS"
		| "DELETE_USER"
		| "COMPLETE_EXERCISE";
	token?: string;
	userId?: string;
	userDetails?: UserProfile;
	exerciseId?: string;
	answers?: FollowupAnswers;
};

// Initial user state
const initialState: UserState = {
	isLoggedIn: false,
	token: null,
	userDetails: null,
	userId: null,
	completedExercises: [],
	lastCompletedExercise: null,
};

// User reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				token: action.token ?? state.token,
				userId: action.userId ?? state.userId,
				userDetails: {
					...state.userDetails,
					...action.userDetails,
				} as UserProfile,
			};
		case "LOGOUT":
		case "DELETE_USER":
			return initialState;
		case "REGISTER":
			return {
				...state,
				userDetails: action.userDetails ?? state.userDetails,
			};
		case "UPDATE_USER_DETAILS":
			return {
				...state,
				userDetails: action.userDetails
					? { ...state.userDetails, ...action.userDetails }
					: state.userDetails,
			};
		case "COMPLETE_EXERCISE":
			if (action.exerciseId && action.answers) {
				const newCompletedExercise: CompletedExercise = {
					exerciseId: action.exerciseId,
					answers: action.answers,
					completedAt: new Date(),
				};
				return {
					...state,
					completedExercises: [
						...state.completedExercises,
						newCompletedExercise,
					],
					lastCompletedExercise: newCompletedExercise,
				};
			}
			console.error(
				"Error: Missing exerciseId or answers for COMPLETE_EXERCISE action",
			);
			return state;
		default:
			return state;
	}
};

// UserContext definition
const UserContext = createContext<{
	state: UserState;
	dispatch: React.Dispatch<UserAction>;
	completeExercise: (
		userId: string,
		exerciseId: string,
		answers: FollowupAnswers,
	) => Promise<void>;
	startAIChat: (userId: string) => Promise<void>;
	sendMessageToAIChat: (chatId: string, message: string) => Promise<void>;
	deleteUser: (userId: string) => Promise<void>;
}>({
	state: initialState,
	dispatch: () => null,
	completeExercise: async () => {},
	startAIChat: async () => {},
	sendMessageToAIChat: async () => {},
	deleteUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	const deleteUser = useCallback(async (userId: string) => {
		if (!userId) {
			console.error("Error: userId is undefined");
			return;
		}
		try {
			const auth = getAuth();
			const user = auth.currentUser;
			if (user) {
				await firebaseDeleteUser(user);
				console.log("User deleted from Firebase Auth");
				dispatch({ type: "DELETE_USER" });
			}
		} catch (error) {
			console.error("Error deleting user from Firebase Auth:", error);
		}
	}, []);

	const completeExercise = useCallback(
		async (userId: string, exerciseId: string, answers: FollowupAnswers) => {
			if (!userId || !exerciseId || !answers) {
				console.error("Error: userId, exerciseId, or answers are undefined");
				return;
			}
			dispatch({ type: "COMPLETE_EXERCISE", userId, exerciseId, answers });
			try {
				await addDoc(collection(db, "users", userId, "completedExercises"), {
					exerciseId,
					...answers,
					completedAt: new Date(),
				});
			} catch (error) {
				console.error("Error saving completed exercise:", error);
			}
		},
		[],
	);

	const startAIChat = useCallback(async (userId: string) => {
		try {
			await apiService.startAIChat(userId);
		} catch (error) {
			console.error("Failed to start AI chat:", error);
		}
	}, []);

	const sendMessageToAIChat = useCallback(
		async (chatId: string, message: string) => {
			try {
				await apiService.sendMessageToAIChat(chatId, message);
			} catch (error) {
				console.error("Failed to send message:", error);
			}
		},
		[],
	);

	return (
		<UserContext.Provider
			value={{
				state,
				dispatch,
				completeExercise,
				startAIChat,
				sendMessageToAIChat,
				deleteUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
