import React, {
	createContext,
	useContext,
	useReducer,
	Dispatch,
	useCallback,
	PropsWithChildren,
} from "react";
import { apiService } from "../Services/ApiService";

// Define the types for different survey questions
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

export interface NumericInputQuestion {
	id: string;
	question: string;
	type: "numericInput";
}

// Combine all question types into one union type
export type SurveyQuestion =
	| SingleChoiceQuestion
	| SliderQuestion
	| NumericInputQuestion;

// Define the structure of an answer
export interface Answer {
	questionId: string;
	answer: string | number;
}

// Add the diagnosis structure
interface Diagnosis {
	title: string;
	description: string;
	exercises: string[];
	timestamp: string; // ISO 8601 timestamp
}

// State structure
interface SurveyState {
	surveyId: string;
	questions: SurveyQuestion[];
	answers: Record<string, Answer>;
	diagnoses: Diagnosis[];
}

// Reducer actions
type SurveyAction =
	| { type: "LOAD_SURVEY"; surveyId: string; questions: SurveyQuestion[] }
	| { type: "ANSWER_QUESTION"; questionId: string; answer: Answer }
	| { type: "RESET_SURVEY" }
	| { type: "LOAD_DIAGNOSIS"; diagnosis: Diagnosis }
	| { type: "REMOVE_DIAGNOSIS"; diagnoses: Diagnosis[] };

// Initial state
const initialState: SurveyState = {
	surveyId: "",
	questions: [],
	answers: {},
	diagnoses: [],
};

// Survey reducer function
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
			return {
				...state,
				surveyId: "",
				questions: [],
				answers: {},
				diagnoses: [],
			};
		case "REMOVE_DIAGNOSIS":
			return {
				...state,
				diagnoses: action.diagnoses,
			};
		case "LOAD_DIAGNOSIS": {
			const newDiagnosis = {
				...action.diagnosis,
				timestamp: new Date().toISOString(),
			};
			const updatedDiagnoses = state.diagnoses.filter(
				(d) => d.title !== newDiagnosis.title,
			);
			return {
				...state,
				diagnoses: [newDiagnosis, ...updatedDiagnoses],
			};
		}
		default:
			return state;
	}
};

export const SurveyContext = createContext<{
	state: SurveyState;
	dispatch: Dispatch<SurveyAction>;
	loadSurvey: (surveyId: string) => Promise<void>;
}>({
	state: initialState,
	dispatch: () => null,
	loadSurvey: async () => {},
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
		<SurveyContext.Provider value={{ state, dispatch, loadSurvey }}>
			{children}
		</SurveyContext.Provider>
	);
}

export default SurveyProvider;
