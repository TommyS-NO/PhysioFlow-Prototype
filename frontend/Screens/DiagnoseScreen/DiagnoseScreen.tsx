import React, { useCallback, useContext, useEffect } from "react";
import { Alert, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SurveyContext } from "../../Context/SurveyContext";
import { styles } from "./DiagnoseScreen_Style";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";
import { auth } from "../../Services/Firebase/FirebaseConfig";

interface Diagnosis {
	id: string;
	title?: string;
	description: string;
	exercises: string[];
}

const DiagnoseScreen: React.FC = () => {
	const { state, dispatch, deleteDiagnosisFromFirestore, loadUserData } =
		useContext(SurveyContext);
	const { diagnoses } = state;

	// useEffect(() => {
	// 	console.log("Diagnoses updated:", diagnoses);
	// }, [diagnoses]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			loadUserData(userId).then(() => {
				console.log("User data loaded");
			});
		}
	}, [loadUserData, auth.currentUser?.uid]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleDelete = useCallback(
		(diagnosisId: string) => {
			Alert.alert(
				"Slett diagnose",
				"Er du sikker på at du vil slette denne diagnosen?",
				[
					{ text: "Avbryt", style: "cancel" },
					{
						text: "Slett",
						style: "destructive",
						onPress: () => deleteDiagnosis(diagnosisId),
					},
				],
			);
		},
		[deleteDiagnosisFromFirestore],
	);

	const deleteDiagnosis = async (diagnosisId: string) => {
		try {
			await deleteDiagnosisFromFirestore(diagnosisId);
			dispatch({ type: "REMOVE_DIAGNOSIS", diagnosisId });
		} catch (error) {
			console.error("Feil ved sletting av diagnose:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>Dine diagnoser</Text>
				{diagnoses && diagnoses.length > 0 ? (
					diagnoses.map((diagnosis: Diagnosis) => (
						<View key={diagnosis.id} style={styles.diagnosisContainer}>
							<View style={styles.header}>
								<Text style={styles.diagnosisTitle}>{diagnosis.title}</Text>
								<TouchableOpacity
									style={styles.deleteButton}
									onPress={() => handleDelete(diagnosis.id)}
								>
									<Text style={styles.deleteText}>Slett</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.description}>{diagnosis.description}</Text>
							<Text style={styles.sectionTitle}>Anbefalte Øvelser</Text>
							{diagnosis.exercises && diagnosis.exercises.length > 0 ? (
								diagnosis.exercises.map((exercise, idx) => (
									<Text
										key={`${diagnosis.id}-${exercise}-${idx}`}
										style={styles.exercise}
									>
										{exercise}
									</Text>
								))
							) : (
								<Text style={styles.noExercisesText}>
									Ingen øvelser funnet.
								</Text>
							)}
						</View>
					))
				) : (
					<Text style={styles.noDiagnosesText}>Ingen diagnoser funnet.</Text>
				)}
			</ScrollView>
			<FooterNavigation />
		</View>
	);
};

export default DiagnoseScreen;
