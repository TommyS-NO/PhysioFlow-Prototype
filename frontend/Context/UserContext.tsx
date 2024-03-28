import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

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

type UserAction =
	| {
			type: "LOGIN";
			token: string;
			userId: string;
			userDetails: Partial<UserProfile>;
	  }
	| { type: "LOGOUT" }
	| { type: "REGISTER"; userDetails: UserProfile }
	| { type: "UPDATE_USER_DETAILS"; details: Partial<UserProfile> };

const initialState: UserState = {
	isLoggedIn: false,
	token: null,
	userDetails: null,
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
}>({
	state: initialState,
	dispatch: () => null,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
