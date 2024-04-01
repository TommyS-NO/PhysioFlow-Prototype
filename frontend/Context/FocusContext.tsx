import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

// Definisjoner
export type FocusAreaKey =
	| "Nakke"
	| "Skulder"
	| "Albue"
	| "Håndledd"
	| "Øvre_rygg"
	| "Nedre_rygg"
	| "Hofte"
	| "Kne"
	| "Ankel";

export interface Answer {
	question: string;
	answer: boolean;
}

interface FocusAreaState {
	selectedAreas: { [key in FocusAreaKey]?: boolean };
	answers: { [key: string]: Answer[] };
	currentQuestionId?: string;
	nextQuestionId?: string;
}

type FocusAreaAction =
	| { type: "SET_AREA"; area: FocusAreaKey; description: boolean }
	| { type: "SET_ANSWERS"; area: FocusAreaKey; answers: Answer[] }
	| { type: "SET_CURRENT_QUESTION"; questionId: string }
	| { type: "SET_NEXT_QUESTION"; questionId: string }
	| { type: "CLEAR_AREAS" };

const initialState: FocusAreaState = {
	selectedAreas: {},
	answers: {},
	currentQuestionId: undefined,
	nextQuestionId: undefined,
};

// Reducer
const focusAreaReducer = (
	state: FocusAreaState,
	action: FocusAreaAction,
): FocusAreaState => {
	switch (action.type) {
		case "SET_AREA":
			return {
				...state,
				selectedAreas: {
					...state.selectedAreas,
					[action.area]: action.description,
				},
			};
		case "SET_ANSWERS":
			return {
				...state,
				answers: {
					...state.answers,
					[action.area]: action.answers,
				},
			};
		case "SET_CURRENT_QUESTION":
			return {
				...state,
				currentQuestionId: action.questionId,
			};
		case "SET_NEXT_QUESTION":
			return {
				...state,
				nextQuestionId: action.questionId,
			};
		case "CLEAR_AREAS":
			return initialState;
		default:
			return state;
	}
};

// Context
const FocusAreaContext = createContext<{
	state: FocusAreaState;
	dispatch: Dispatch<FocusAreaAction>;
}>({ state: initialState, dispatch: () => undefined });

// Custom hook for easier context usage
export const useFocusArea = () => useContext(FocusAreaContext);

// Provider component
interface FocusAreaProviderProps {
	children: ReactNode;
}

export const FocusAreaProvider: React.FC<FocusAreaProviderProps> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(focusAreaReducer, initialState);

	return (
		<FocusAreaContext.Provider value={{ state, dispatch }}>
			{children}
		</FocusAreaContext.Provider>
	);
};

export default FocusAreaContext;
