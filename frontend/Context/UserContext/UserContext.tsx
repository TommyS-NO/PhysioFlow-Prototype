import React, {
	createContext,
	useReducer,
	useContext,
	useCallback,
	ReactNode,
	Dispatch,
} from "react";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, deleteUser as firebaseDeleteUser } from "firebase/auth";
import { db } from "../../Services/Firebase/FirebaseConfig";
import { apiService } from "../../Services/ApiService";
import { UserState, UserAction, FollowupAnswers } from "./userTypes";
import { initialState, userReducer } from "./userReducer";

interface UserContextProps {
	state: UserState;
	dispatch: Dispatch<UserAction>;
	completeExercise: (
		userId: string,
		exerciseId: string,
		answers: FollowupAnswers,
	) => Promise<void>;
	startAIChat: (userId: string) => Promise<void>;
	sendMessageToAIChat: (chatId: string, message: string) => Promise<void>;
	deleteUser: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
	state: initialState,
	dispatch: () => initialState,
	completeExercise: async () => {},
	startAIChat: async () => {},
	sendMessageToAIChat: async () => {},
	deleteUser: async () => {},
});

export const useUser = (): UserContextProps => useContext(UserContext);

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
