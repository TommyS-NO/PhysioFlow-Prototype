import { createContext } from "react";
import {
	FocusAreaState,
	FocusAreaAction,
	initialState,
} from "./focusAreaReducer";

const FocusAreaContext = createContext<{
	state: FocusAreaState;
	dispatch: React.Dispatch<FocusAreaAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

export default FocusAreaContext;
