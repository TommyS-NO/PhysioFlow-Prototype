import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	useCallback,
} from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";

// Exercise type imported from ExerciseContext
import { Exercise } from "./ExerciseContext";
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
			// Ensure all required properties are present before updating state
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
			return initialState;
		case "REGISTER":
			// userDetails in REGISTER action is expected to be a complete UserProfile object
			return {
				...state,
				userDetails: action.userDetails ?? state.userDetails,
			};
		case "UPDATE_USER_DETAILS":
			// Update the userDetails only if details are provided
			return {
				...state,
				userDetails: action.userDetails
					? { ...state.userDetails, ...action.userDetails }
					: state.userDetails,
			};
		case "COMPLETE_EXERCISE":
			// Check for exerciseId and answers before adding new completed exercise
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
			// If fields are missing, log error and return the current state
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
}>({
	state: initialState,
	dispatch: () => null,
	completeExercise: async () => {},
	startAIChat: async () => {},
	sendMessageToAIChat: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
export default UserContext;

// import React, {
// 	createContext,
// 	useReducer,
// 	useContext,
// 	ReactNode,
// 	useCallback,
// } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../Services/Firebase/FirebaseConfig";
// import { apiService } from "../Services/ApiService";

// interface UserProfile {
// 	username?: string;
// 	email: string;
// 	gender?: "male" | "female" | "unspecified";
// 	height?: number;
// 	weight?: number;
// 	birthday?: string;
// 	profileImageUrl?: string;
// }

// interface UserState {
// 	isLoggedIn: boolean;
// 	token: string | null;
// 	userDetails: UserProfile | null;
// 	userId: string | null;
// 	completedExercises: CompletedExercise[];
// 	lastCompletedExercise: CompletedExercise | null;
// }

// type AnswerWithUnit = { value: number; unit: string };

// interface FollowupAnswers {
// 	painIntensity: AnswerWithUnit;
// 	repetitionsCompleted: AnswerWithUnit;
// 	difficultyLevel: AnswerWithUnit;
// 	timeTaken: AnswerWithUnit;
// 	generalAbility: AnswerWithUnit;
// }

// type CompletedExercise = {
// 	exerciseId: string;
// 	answers: FollowupAnswers;
// 	completedAt: Date;
// };

// const initialState: UserState = {
// 	isLoggedIn: false,
// 	token: null,
// 	userDetails: null,
// 	userId: null,
// 	completedExercises: [],
// 	lastCompletedExercise: null,
// };

// type UserAction =
// 	| { type: "LOGIN"; token: string; userId: string; userDetails: UserProfile }
// 	| { type: "LOGOUT" }
// 	| { type: "REGISTER"; userDetails: UserProfile }
// 	| { type: "UPDATE_USER_DETAILS"; userDetails: UserProfile }
// 	| {
// 			type: "COMPLETE_EXERCISE";
// 			exerciseId: string;
// 			answers: FollowupAnswers;
// 			userId: string;
// 	  };

// const userReducer = (state: UserState, action: UserAction): UserState => {
// 	switch (action.type) {
// 		case "LOGIN":
// 			return {
// 				...state,
// 				isLoggedIn: true,
// 				token: action.token,
// 				userId: action.userId,
// 				userDetails: action.userDetails,
// 			};
// 		case "LOGOUT":
// 			return initialState;
// 		case "REGISTER":
// 		case "UPDATE_USER_DETAILS":
// 			return {
// 				...state,
// 				userDetails: { ...state.userDetails, ...action.userDetails },
// 			};
// 		case "COMPLETE_EXERCISE": {
// 			const newCompletedExercise = {
// 				exerciseId: action.exerciseId,
// 				answers: action.answers,
// 				completedAt: new Date(),
// 			};
// 			return {
// 				...state,
// 				completedExercises: [...state.completedExercises, newCompletedExercise],
// 				lastCompletedExercise: newCompletedExercise,
// 			};
// 		}
// 		default:
// 			return state;
// 	}
// };

// const UserContext = createContext<{
// 	state: UserState;
// 	dispatch: React.Dispatch<UserAction>;
// 	completeExercise: (
// 		userId: string,
// 		exerciseId: string,
// 		answers: FollowupAnswers,
// 	) => Promise<void>;
// 	startAIChat: (userId: string) => Promise<void>;
// 	sendMessageToAIChat: (chatId: string, message: string) => Promise<void>;
// }>({
// 	state: initialState,
// 	dispatch: () => {},
// 	completeExercise: async () => {},
// 	startAIChat: async () => {},
// 	sendMessageToAIChat: async () => {},
// });

// export const useUser = () => useContext(UserContext);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({
// 	children,
// }) => {
// 	const [state, dispatch] = useReducer(userReducer, initialState);

// 	const completeExercise = useCallback(
// 		async (userId: string, exerciseId: string, answers: FollowupAnswers) => {
// 			if (!userId || !exerciseId || !answers) {
// 				console.error("Error: userId, exerciseId, or answers are undefined");
// 				return;
// 			}
// 			const formattedAnswers = {
// 				painIntensity: { value: answers.painIntensity.value, unit: "N/A" },
// 				repetitionsCompleted: {
// 					value: answers.repetitionsCompleted.value,
// 					unit: "reps",
// 				},
// 				difficultyLevel: { value: answers.difficultyLevel.value, unit: "N/A" },
// 				timeTaken: { value: answers.timeTaken.value, unit: "minutes" },
// 				generalAbility: { value: answers.generalAbility.value, unit: "N/A" },
// 			};
// 			dispatch({
// 				type: "COMPLETE_EXERCISE",
// 				userId,
// 				exerciseId,
// 				answers: formattedAnswers,
// 			});
// 			try {
// 				await addDoc(collection(db, "users", userId, "completedExercises"), {
// 					...formattedAnswers,
// 					completedAt: new Date(),
// 				});
// 			} catch (error) {
// 				console.error("Error saving completed exercise:", error);
// 			}
// 		},
// 		[],
// 	);

// 	const startAIChat = useCallback(async (userId: string) => {
// 		try {
// 			await apiService.startAIChat(userId);
// 		} catch (error) {
// 			console.error("Failed to start AI chat:", error);
// 		}
// 	}, []);

// 	const sendMessageToAIChat = useCallback(
// 		async (chatId: string, message: string) => {
// 			try {
// 				await apiService.sendMessageToAIChat(chatId, message);
// 			} catch (error) {
// 				console.error("Failed to send message:", error);
// 			}
// 		},
// 		[],
// 	);

// 	return (
// 		<UserContext.Provider
// 			value={{
// 				state,
// 				dispatch,
// 				completeExercise,
// 				startAIChat,
// 				sendMessageToAIChat,
// 			}}
// 		>
// 			{children}
// 		</UserContext.Provider>
// 	);
// };

// export default UserContext;
