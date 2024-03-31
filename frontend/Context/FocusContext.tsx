import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

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
	selectedAreas: {
		[key in FocusAreaKey]?: string;
	};
	answers: {
		[key: string]: Answer[];
	};
}

type FocusAreaAction =
	| { type: "SET_AREA"; area: FocusAreaKey; description: boolean }
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
	console.log("Dispatching action:", action);

	switch (action.type) {
		case "SET_AREA": {
			const newStateForSetArea = {
				...state,
				selectedAreas: {
					...state.selectedAreas,
					[action.area]: action.description,
				},
			};
			console.log("New state after SET_AREA:", newStateForSetArea);
			return newStateForSetArea;
		}
		case "SET_ANSWERS": {
			const newStateForSetAnswers = {
				...state,
				answers: {
					...state.answers,
					[action.area]: action.answers,
				},
			};
			console.log("New state after SET_ANSWERS:", newStateForSetAnswers);
			return newStateForSetAnswers;
		}
		case "CLEAR_AREAS":
			console.log("State reset to initialState after CLEAR_AREAS.");
			return initialState;
		default:
			console.log("Default case hit, returning current state.");
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
