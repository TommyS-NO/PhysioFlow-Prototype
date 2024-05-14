import React, {
	createContext,
	useContext,
	useReducer,
	useCallback,
	PropsWithChildren,
	useEffect,
	ReactNode,
	Dispatch,
} from "react";
import { collection, getDocs } from "firebase/firestore";
import {
	auth,
	db,
	addDiagnosis,
	deleteDiagnosis,
	fetchUserDetailsFromFirestore,
} from "../Services/Firebase/FirebaseConfig";
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
	id: string;
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
	loading: boolean;
}

type SurveyAction =
	| { type: "LOAD_SURVEY"; surveyId: string; questions: SurveyQuestion[] }
	| { type: "ANSWER_QUESTION"; questionId: string; answer: Answer }
	| { type: "RESET_SURVEY" }
	| { type: "SAVE_DIAGNOSIS"; diagnosis: Diagnosis }
	| { type: "REMOVE_DIAGNOSIS"; diagnosisId: string }
	| { type: "LOAD_DIAGNOSES"; diagnoses: Diagnosis[] }
	| { type: "SET_LOADING"; loading: boolean };

const initialState: SurveyState = {
	surveyId: "",
	questions: [],
	answers: {},
	diagnoses: [],
	loading: false,
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
		case "SAVE_DIAGNOSIS":
			return {
				...state,
				diagnoses: [...state.diagnoses, action.diagnosis],
			};
		case "REMOVE_DIAGNOSIS":
			return {
				...state,
				diagnoses: state.diagnoses.filter((d) => d.id !== action.diagnosisId),
			};
		case "LOAD_DIAGNOSES":
			return {
				...state,
				diagnoses: action.diagnoses,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.loading,
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
	fetchDiagnoses: () => Promise<void>;
	loadUserData: (userId: string) => Promise<void>;
}>({
	state: initialState,
	dispatch: () => null,
	loadSurvey: async () => {},
	saveDiagnosisToFirestore: async () => {},
	deleteDiagnosisFromFirestore: async () => {},
	fetchDiagnoses: async () => {},
	loadUserData: async () => {},
});

export const useSurvey = () => useContext(SurveyContext);

function SurveyProvider({ children }: PropsWithChildren<ReactNode>) {
	const [state, dispatch] = useReducer(SurveyReducer, initialState);

	const fetchDiagnoses = useCallback(async () => {
		if (!auth.currentUser) return;
		const userId = auth.currentUser.uid;
		dispatch({ type: "SET_LOADING", loading: true });
		const querySnapshot = await getDocs(
			collection(db, "users", userId, "diagnoses"),
		);
		const diagnoses = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				title: data.diagnosis || data.title,
				description: data.description,
				exercises: data.exercises,
				timestamp: data.timestamp,
			} as Diagnosis;
		});
		dispatch({ type: "LOAD_DIAGNOSES", diagnoses });
		dispatch({ type: "SET_LOADING", loading: false });
	}, []);

	const loadSurvey = useCallback(async (surveyId: string) => {
		try {
			const surveyData = await apiService.getSurvey(surveyId);
			dispatch({
				type: "LOAD_SURVEY",
				surveyId,
				questions: surveyData.questions,
			});
		} catch (error) {
			console.error("Error loading survey:", error);
		}
	}, []);

	const saveDiagnosisToFirestore = useCallback(async (diagnosis: Diagnosis) => {
		if (!auth.currentUser) return;
		const userId = auth.currentUser.uid;
		try {
			await addDiagnosis(userId, diagnosis);
			dispatch({
				type: "SAVE_DIAGNOSIS",
				diagnosis,
			});
		} catch (error) {
			console.error("Error saving diagnosis to Firestore:", error);
		}
	}, []);

	const deleteDiagnosisFromFirestore = useCallback(
		async (diagnosisId: string) => {
			if (!auth.currentUser) return;
			const userId = auth.currentUser.uid;
			try {
				await deleteDiagnosis(userId, diagnosisId);
				dispatch({ type: "REMOVE_DIAGNOSIS", diagnosisId });
			} catch (error) {
				console.error("Error deleting diagnosis from Firestore:", error);
			}
		},
		[],
	);

	const loadUserData = useCallback(async (userId: string) => {
		try {
			const userData = await fetchUserDetailsFromFirestore(userId);
			const diagnoses = userData.diagnoses.map((diagnosis) => ({
				...diagnosis,
				title: diagnosis.diagnosis,
			}));
			dispatch({ type: "LOAD_DIAGNOSES", diagnoses });
		} catch (error) {
			console.error("Feil under lasting av brukerdata: ", error);
			alert("Kunne ikke laste brukerdata. Vennligst prøv igjen senere.");
		}
	}, []);

	return (
		<SurveyContext.Provider
			value={{
				state,
				dispatch,
				loadSurvey,
				saveDiagnosisToFirestore,
				deleteDiagnosisFromFirestore,
				fetchDiagnoses,
				loadUserData,
			}}
		>
			{children}
		</SurveyContext.Provider>
	);
}

export default SurveyProvider;
