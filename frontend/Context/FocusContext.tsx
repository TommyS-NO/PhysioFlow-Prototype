import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from "react";

// Fokusområder typer og interfaces
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

interface FocusAreaState {
	selectedAreas: { [key in FocusAreaKey]?: boolean };
}

type FocusAreaAction =
	| { type: "SET_AREA"; area: FocusAreaKey; isSelected: boolean }
	| { type: "CLEAR_AREAS" };

const initialState: FocusAreaState = {
	selectedAreas: {},
};

// Reducer
const focusAreaReducer = (
	state: FocusAreaState,
	action: FocusAreaAction,
): FocusAreaState => {
	switch (action.type) {
		case "SET_AREA": {
			const { area, isSelected, focusArea } = action;
			return {
				...state,
				selectedAreas: {
					...state.selectedAreas,
					[area]: isSelected,
					...(focusArea && { currentFocusArea: focusArea }),
				},
			};
		}
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
}>({
	state: initialState,
	dispatch: () => null,
});

export const useFocusArea = () => useContext(FocusAreaContext);

// Provider
export const FocusAreaProvider: React.FC<{ children: ReactNode }> = ({
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
