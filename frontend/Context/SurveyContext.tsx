import React, {
	createContext,
	useContext,
	useReducer,
	Dispatch,
	useCallback,
	PropsWithChildren,
} from "react";
import { apiService } from "../Services/ApiService";

export interface SingleChoiceQuestion {
	id: string;
	question: string;
	options: string[];
	type: "singleChoice";
}

export interface SliderQuestion {
	title: string;
	maxValue: number;
	minValue: number;
	id: string;
	question: string;
	sliderMin: number;
	sliderMax: number;
	type: "slider";
}

export type SurveyQuestion = SingleChoiceQuestion | SliderQuestion;

export interface Answer {
	questionId: string;
	answer: string | number;
}

interface SurveyState {
	surveyId: string;
	questions: SurveyQuestion[];
	answers: Record<string, Answer>;
}

type SurveyAction =
	| { type: "LOAD_SURVEY"; surveyId: string; questions: SurveyQuestion[] }
	| { type: "ANSWER_QUESTION"; questionId: string; answer: Answer }
	| { type: "RESET_SURVEY" };

const initialState: SurveyState = {
	surveyId: "",
	questions: [],
	answers: {},
};

const SurveyReducer = (
	state: SurveyState,
	action: SurveyAction,
): SurveyState => {
	switch (action.type) {
		case "LOAD_SURVEY":
			return {
				...state,
				surveyId: action.surveyId,
				questions: action.questions,
			};
		case "ANSWER_QUESTION":
			return {
				...state,
				answers: {
					...state.answers,
					[action.questionId]: action.answer,
				},
			};
		case "RESET_SURVEY":
			return initialState;
		default:
			return state;
	}
};

export const SurveyContext = createContext<{
	state: SurveyState;
	dispatch: Dispatch<SurveyAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

export const useSurvey = () => useContext(SurveyContext);

function SurveyProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(SurveyReducer, initialState);

	const loadSurvey = useCallback(async (surveyId: string) => {
		try {
			const surveyData = await apiService.getSurvey(surveyId);
			console.log("Survey data:", surveyData);
			dispatch({
				type: "LOAD_SURVEY",
				surveyId,
				questions: surveyData.questions,
			});
		} catch (error) {
			console.error("Error loading survey:", error);
		}
	}, []);

	return (
		<SurveyContext.Provider value={{ state, dispatch }}>
			{children}
		</SurveyContext.Provider>
	);
}

export default SurveyProvider;
