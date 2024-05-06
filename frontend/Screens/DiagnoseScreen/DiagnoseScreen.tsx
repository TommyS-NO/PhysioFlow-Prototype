import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SurveyContext } from "../../Context/SurveyContext";
import { styles } from "./DiagnoseScreen_Style";
import { format } from "date-fns";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";

const DiagnoseScreen = () => {
	const { state, dispatch } = useContext(SurveyContext);
	const { diagnoses } = state;

	// Remove diagnosis from the list
	const handleDelete = (index: number) => {
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
					onPress: () => {
						const updatedDiagnoses = diagnoses.filter(
							(_, idx) => idx !== index,
						);
						dispatch({ type: "REMOVE_DIAGNOSIS", diagnoses: updatedDiagnoses });
					},
				},
			],
		);
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Dine diagnoser</Text>
			{diagnoses && diagnoses.length > 0 ? (
				diagnoses
					.sort(
						(a, b) =>
							new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
					)
					.map((diag, index) => (
						<View key={index} style={styles.diagnosisContainer}>
							<View style={styles.header}>
								<Text style={styles.diagnosisTitle}>{diag.title}</Text>
								<TouchableOpacity
									style={styles.deleteButton}
									onPress={() => handleDelete(index)}
								>
									<Text style={styles.deleteText}>Slett</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.timestamp}>
								{format(new Date(diag.timestamp), "dd/MM/yyyy HH:mm")}
							</Text>
							<Text style={styles.description}>{diag.description}</Text>
							<Text style={styles.sectionTitle}>Anbefalte Øvelser</Text>
							{diag.exercises.map((exercise, idx) => (
								<Text key={idx} style={styles.exercise}>
									{exercise}
								</Text>
							))}
						</View>
					))
			) : (
				<Text style={styles.noDiagnosesText}>Ingen diagnoser funnet.</Text>
			)}
						<FooterNavigation />
		</ScrollView>
	);
};

export default DiagnoseScreen;
