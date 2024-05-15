import React, { useReducer, useCallback } from "react";
import SurveyContext from "./SurveyContext";
import surveyReducer, { initialState } from "./surveyReducer";
import { collection, getDocs } from "firebase/firestore";
import {
	auth,
	db,
	addDiagnosis,
	deleteDiagnosis,
	fetchUserDetailsFromFirestore,
} from "../../Services/Firebase/FirebaseConfig";
import { apiService } from "../../Services/ApiService";
import { Diagnosis, SurveyId } from "./surveyTypes";

interface SurveyProviderProps {
	children: React.ReactNode;
}

const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(surveyReducer, initialState);

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

	const loadSurvey = useCallback(async (surveyId: SurveyId) => {
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
			const diagnoses = userData.diagnoses.map((diagnosis: Diagnosis) => ({
				...diagnosis,
				title: diagnosis.diagnosis || diagnosis.title,
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
};

export default SurveyProvider;
