import React, { createContext, useReducer, useContext, Dispatch } from "react";

// Definere typer for staten
type FocusAreaState = {
	selectedAreas: {
		[key in FocusAreaKey]?: string;
	};
};

// Handlingstyper
type FocusAreaAction =
	| { type: "SET_AREA"; area: FocusAreaKey; description: string }
	| { type: "CLEAR_AREAS" };

// Initial state
const initialState: FocusAreaState = {
	selectedAreas: {},
};

// Reducer-funksjonen
const focusAreaReducer = (state: FocusAreaState, action: FocusAreaAction) => {
	switch (action.type) {
		case "SET_AREA":
			return {
				...state,
				selectedAreas: {
					...state.selectedAreas,
					[action.area]: action.description,
				},
			};
		case "CLEAR_AREAS":
			return initialState;
		default:
			return state;
	}
};

// Oppretter Context
const FocusAreaContext = createContext<{
	state: FocusAreaState;
	dispatch: Dispatch<FocusAreaAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

// Hook for å bruke context
export const useFocusArea = () => useContext(FocusAreaContext);

// Provider-komponenten
export const FocusAreaProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(focusAreaReducer, initialState);

	return (
		<FocusAreaContext.Provider value={{ state, dispatch }}>
			{children}
		</FocusAreaContext.Provider>
	);
};

export default FocusAreaContext;
