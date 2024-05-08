import React, { useContext, useCallback } from "react";
import { Alert, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SurveyContext } from "../../Context/SurveyContext";
import { styles } from "./DiagnoseScreen_Style";
import { format } from "date-fns";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";

const DiagnoseScreen = () => {
	const { state, dispatch, deleteDiagnosisFromFirestore } =
		useContext(SurveyContext);
	const { diagnoses } = state;

	const handleDelete = useCallback(
		async (diagnosisId) => {
			Alert.alert(
				"Slett diagnose",
				"Er du sikker på at du vil slette denne diagnosen?",
				[
					{
						text: "Avbryt",
						style: "cancel",
					},
					{
						text: "Slett",
						style: "destructive",
						onPress: async () => {
							try {
								await deleteDiagnosisFromFirestore(diagnosisId);
								dispatch({ type: "REMOVE_DIAGNOSIS", diagnosisId });
							} catch (error) {
								console.error("Feil ved sletting av diagnose:", error);
							}
						},
					},
				],
			);
		},
		[deleteDiagnosisFromFirestore, dispatch],
	);

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>Dine diagnoser</Text>
				{diagnoses.length > 0 ? (
					diagnoses.map((diagnosis, index) => (
						<View key={index} style={styles.diagnosisContainer}>
							<View style={styles.header}>
								<Text style={styles.diagnosisTitle}>{diagnosis.title}</Text>
								<TouchableOpacity
									style={styles.deleteButton}
									onPress={() => handleDelete(diagnosis.timestamp)}
								>
									<Text style={styles.deleteText}>Slett</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.timestamp}>
								{format(new Date(diagnosis.timestamp), "dd/MM/yyyy HH:mm")}
							</Text>
							<Text style={styles.description}>{diagnosis.description}</Text>
							<Text style={styles.sectionTitle}>Anbefalte Øvelser</Text>
							{diagnosis.exercises.map((exercise, idx) => (
								<Text key={idx} style={styles.exercise}>
									{exercise}
								</Text>
							))}
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
