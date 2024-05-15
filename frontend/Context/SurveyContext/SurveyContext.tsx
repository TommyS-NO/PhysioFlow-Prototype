import { createContext, useContext, Dispatch } from "react";
import { SurveyState, SurveyAction, initialState } from "./surveyReducer";
import { Diagnosis } from "./surveyTypes";

const SurveyContext = createContext<{
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

export default SurveyContext;
