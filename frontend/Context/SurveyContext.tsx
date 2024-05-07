import React, {
	createContext,
	useContext,
	useReducer,
	Dispatch,
	useCallback,
	PropsWithChildren,
} from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Services/Firebase/FirebaseConfig";
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

export interface NumericInputQuestion {
	id: string;
	question: string;
	type: "numericInput";
}

export type SurveyQuestion =
	| SingleChoiceQuestion
	| SliderQuestion
	| NumericInputQuestion;

export interface Answer {
	questionId: string;
	answer: string | number;
}

interface Diagnosis {
	title: string;
	description: string;
	exercises: string[];
	timestamp: string;
}

interface SurveyState {
	surveyId: string;
	questions: SurveyQuestion[];
	answers: Record<string, Answer>;
	diagnoses: Diagnosis[];
}

type SurveyAction =
	| { type: "LOAD_SURVEY"; surveyId: string; questions: SurveyQuestion[] }
	| { type: "ANSWER_QUESTION"; questionId: string; answer: Answer }
	| { type: "RESET_SURVEY" }
	| { type: "SAVE_DIAGNOSIS"; diagnosis: Diagnosis }
	| { type: "REMOVE_DIAGNOSIS"; diagnosisId: string };

const initialState: SurveyState = {
	surveyId: "",
	questions: [],
	answers: {},
	diagnoses: [],
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
			return {
				...state,
				surveyId: "",
				questions: [],
				answers: {},
				diagnoses: [],
			};
		case "SAVE_DIAGNOSIS":
			return {
				...state,
				diagnoses: [...state.diagnoses, action.diagnosis],
			};
		case "REMOVE_DIAGNOSIS":
			return {
				...state,
				diagnoses: state.diagnoses.filter(
					(d) => d.timestamp !== action.diagnosisId,
				),
			};
		default:
			return state;
	}
};

export const SurveyContext = createContext<{
	state: SurveyState;
	dispatch: Dispatch<SurveyAction>;
	loadSurvey: (surveyId: string) => Promise<void>;
	saveDiagnosisToFirestore: (diagnosis: Diagnosis) => Promise<void>;
	deleteDiagnosisFromFirestore: (diagnosisId: string) => Promise<void>;
}>({
	state: initialState,
	dispatch: () => null,
	loadSurvey: async () => {},
	saveDiagnosisToFirestore: async () => {},
	deleteDiagnosisFromFirestore: async () => {},
});

export const useSurvey = () => useContext(SurveyContext);

function SurveyProvider({ children }: PropsWithChildren<any>) {
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

	const saveDiagnosisToFirestore = async (diagnosis: Diagnosis) => {
		try {
			await addDoc(collection(db, "diagnoses"), diagnosis);
			dispatch({ type: "SAVE_DIAGNOSIS", diagnosis });
		} catch (error) {
			console.error("Error saving diagnosis to Firestore:", error);
		}
	};

	const deleteDiagnosisFromFirestore = async (diagnosisId: string) => {
		try {
			await deleteDoc(doc(db, "diagnoses", diagnosisId));
			dispatch({ type: "REMOVE_DIAGNOSIS", diagnosisId });
		} catch (error) {
			console.error("Error deleting diagnosis from Firestore:", error);
		}
	};

	return (
		<SurveyContext.Provider
			value={{
				state,
				dispatch,
				loadSurvey,
				saveDiagnosisToFirestore,
				deleteDiagnosisFromFirestore,
			}}
		>
			{children}
		</SurveyContext.Provider>
	);
}

export default SurveyProvider;
