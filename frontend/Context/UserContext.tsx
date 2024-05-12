import React, {
	createContext,
	useReducer,
	useContext,
	useCallback,
	ReactNode,
} from "react";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, deleteUser as firebaseDeleteUser } from "firebase/auth";
import { db } from "../Services/Firebase/FirebaseConfig";
import { apiService } from "../Services/ApiService";

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
	completedExercises: CompletedExercise[];
	lastCompletedExercise: CompletedExercise | null;
}

interface FollowupAnswers {
	painIntensity: number;
	repetitionsCompleted: number;
	difficultyLevel: number;
	timeTaken: number;
	generalAbility: number;
}

interface CompletedExercise {
	exerciseId: string;
	answers: FollowupAnswers;
	completedAt: Date;
}

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

const initialState: UserState = {
	isLoggedIn: false,
	token: null,
	userDetails: null,
	userId: null,
	completedExercises: [],
	lastCompletedExercise: null,
};

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
			return { ...state, userDetails: action.userDetails ?? state.userDetails };
		case "UPDATE_USER_DETAILS":
			return {
				...state,
				userDetails: { ...state.userDetails, ...action.userDetails },
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
			return state;
		default:
			return state;
	}
};

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
		const auth = getAuth();
		const user = auth.currentUser;
		if (user && user.uid === userId) {
			await firebaseDeleteUser(user);
			dispatch({ type: "DELETE_USER" });
		}
	}, []);

	const completeExercise = useCallback(
		async (userId: string, exerciseId: string, answers: FollowupAnswers) => {
			dispatch({ type: "COMPLETE_EXERCISE", exerciseId, answers });
			await addDoc(collection(db, "users", userId, "completedExercises"), {
				exerciseId,
				...answers,
				completedAt: new Date(),
			});
		},
		[],
	);

	const startAIChat = useCallback(async (userId: string) => {
		await apiService.startAIChat(userId);
	}, []);

	const sendMessageToAIChat = useCallback(
		async (chatId: string, message: string) => {
			await apiService.sendMessageToAIChat(chatId, message);
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
