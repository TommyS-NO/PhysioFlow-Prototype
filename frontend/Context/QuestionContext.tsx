import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
	useEffect,
	useCallback,
} from "react";
import { questionService } from "../Services/questionService";

// Antar at du har en type definisjon for spørsmålene som kommer fra Firestore
export interface GeneralQuestion {
	id: string;
	text: string;
	options: string[];
}
export interface Answer {
	questionId: string;
	answer: boolean;
}

interface QuestionState {
	answers: { [key: string]: Answer[] };
	generalQuestions: GeneralQuestion[];
	currentQuestionId?: string;
	nextQuestionId?: string;
}

type QuestionAction =
	| { type: "SET_ANSWERS"; questionId: string; answers: Answer[] }
	| { type: "SET_CURRENT_QUESTION"; questionId: string }
	| { type: "SET_NEXT_QUESTION"; questionId: string }
	| { type: "CLEAR_QUESTIONS" }
	| { type: "LOAD_GENERAL_QUESTIONS"; questions: GeneralQuestion[] }; // Ny actiontype for å laste inn generelle spørsmål

const initialState: QuestionState = {
	answers: {},
	generalQuestions: [],
	currentQuestionId: undefined,
	nextQuestionId: undefined,
};

// Reducer
const questionReducer = (
	state: QuestionState,
	action: QuestionAction,
): QuestionState => {
	switch (action.type) {
		case "SET_ANSWERS":
			return {
				...state,
				answers: {
					...state.answers,
					[action.questionId]: action.answers,
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
		case "CLEAR_QUESTIONS":
			return {
				...state,
				answers: {},
				currentQuestionId: undefined,
				nextQuestionId: undefined,
			};
		case "LOAD_GENERAL_QUESTIONS":
			return {
				...state,
				generalQuestions: action.questions,
			};
		default:
			return state;
	}
};

// Context
const QuestionContext = createContext<{
	state: QuestionState;
	dispatch: Dispatch<QuestionAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

// Custom hook for easier context usage
export const useQuestion = () => useContext(QuestionContext);

// Provider component
export const QuestionProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(questionReducer, initialState);

	// Last inn de generelle spørsmålene en gang og ikke hver gang brukeren trykker på et fokusområde
	const loadGeneralQuestions = useCallback(async () => {
		// Denne funksjonen skal kalles når appen starter eller når det er nødvendig
		try {
			// Anta at vi har en service-funksjon for å hente spørsmål
			const questions = await questionService.getGeneralQuestions();
			dispatch({ type: "LOAD_GENERAL_QUESTIONS", questions });
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		loadGeneralQuestions();
	}, [loadGeneralQuestions]);

	return (
		<QuestionContext.Provider value={{ state, dispatch }}>
			{children}
		</QuestionContext.Provider>
	);
};

export default QuestionContext;
