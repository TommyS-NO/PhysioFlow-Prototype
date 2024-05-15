import React, { useReducer } from "react";
import FocusAreaContext from "./FocusAreaContext";
import focusAreaReducer, { initialState } from "./focusAreaReducer";

interface FocusAreaProviderProps {
	children: React.ReactNode;
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

export default FocusAreaProvider;
