import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

type FocusAreaKey =
	| "Nakke"
	| "Skulder"
	| "Albue"
	| "Håndledd"
	| "Øvre_rygg"
	| "Nedre_rygg"
	| "Hofte"
	| "Kne"
	| "Ankel";

interface Answer {
	question: string;
	answer: boolean;
}

interface FocusAreaState {
	selectedAreas: {
		[key in FocusAreaKey]?: string;
	};
	answers: {
		[key in FocusAreaKey]?: Answer[];
	};
}

type FocusAreaAction =
	| { type: "SET_AREA"; area: FocusAreaKey; description: string }
	| { type: "SET_ANSWERS"; area: FocusAreaKey; answers: Answer[] }
	| { type: "CLEAR_AREAS" };

const initialState: FocusAreaState = {
	selectedAreas: {},
	answers: {},
};

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
		case "CLEAR_AREAS":
			return initialState;
		default:
			return state;
	}
};

const FocusAreaContext = createContext<{
	state: FocusAreaState;
	dispatch: Dispatch<FocusAreaAction>;
}>({ state: initialState, dispatch: () => null });

export const useFocusArea = () => useContext(FocusAreaContext);

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
