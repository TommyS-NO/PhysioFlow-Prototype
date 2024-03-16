import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

type UserProviderProps = {
	children: ReactNode;
};

// Define types for the state
type UserState = {
	isLoggedIn: boolean;
	token: string | null;
	userDetails: {
		username: string;
		email: string;
		password: string;
		gender: "male" | "female" | "unspecified" | undefined;
		height: number;
		weight: number;
		birthday: string; // Format: YYYY-MM-DD
		acceptTerms: boolean;
	} | null;
};

// Define action types
type UserAction =
	| { type: "LOGIN"; token: string }
	| { type: "LOGOUT" }
	| { type: "REGISTER"; userDetails: UserState["userDetails"] }
	| { type: "UPDATE_USER_DETAILS"; details: Partial<UserState["userDetails"]> };

// Initial state
const initialState: UserState = {
	isLoggedIn: false,
	token: null,
	userDetails: null,
};

// Reducer function
const userReducer = (state: UserState, action: UserAction) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				token: action.token,
			};
		case "LOGOUT":
			return {
				...initialState,
			};
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

// Create Context
const UserContext = createContext<{
	state: UserState;
	dispatch: Dispatch<UserAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

// Hook to use context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	// Corrected type here
	const [state, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
