import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

// Definerer nøkkeltyper for fokusområder
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

// Struktur for svar
export interface Answer {
	question: string;
	answer: boolean;
}

// Statens struktur
interface FocusAreaState {
	selectedAreas: {
		[key in FocusAreaKey]?: string;
	};
	answers: {
		[key in FocusAreaKey]?: Answer[];
	};
}

// Handlinger som kan påvirke staten
type FocusAreaAction =
	| { type: "SET_AREA"; area: FocusAreaKey; description: string }
	| { type: "SET_ANSWERS"; area: FocusAreaKey; answers: Answer[] }
	| { type: "CLEAR_AREAS" };

// Initial state
const initialState: FocusAreaState = {
	selectedAreas: {},
	answers: {},
};

// Reducer-funksjonen som håndterer endringer i tilstand basert på handlinger
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

// Context opprettelse
const FocusAreaContext = createContext<
	{ state: FocusAreaState; dispatch: Dispatch<FocusAreaAction> } | undefined
>(undefined);

// Hook for å bruke denne konteksten
export const useFocusArea = (): {
	state: FocusAreaState;
	dispatch: Dispatch<FocusAreaAction>;
} => {
	const context = useContext(FocusAreaContext);
	if (context === undefined) {
		throw new Error("useFocusArea must be used within a FocusAreaProvider");
	}
	return context;
};

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
interface FocusAreaProviderProps {
	children: ReactNode;
}
export default FocusAreaProvider;
