import React, { useContext, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Alert,
	Modal,
} from "react-native";
import { Exercise, ExerciseContext } from "../../Context/ExerciseContext";
import { useSurvey } from "../../Context/SurveyContext";
import { styles } from "./ExerciseOverviewScreen_Style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ExerciseOverviewScreen: React.FC = () => {
	const { selectedExercises, removeExercise } = useContext(ExerciseContext);
	const {
		state: surveyState,
		dispatch: surveyDispatch,
		loadSurvey,
	} = useSurvey();
	const [isSurveyVisible, setSurveyVisible] = useState(false);
	const [completedExercises, setCompletedExercises] = useState<string[]>([]);

	const handleCompleteExercise = async (exercise: Exercise) => {
		setSurveyVisible(true);
		await loadSurvey("followup");
		setCompletedExercises([...completedExercises, exercise.id]);
	};

	const closeSurvey = () => {
		setSurveyVisible(false);
	};

	const handleRemoveExercise = (exerciseId: string) => {
		Alert.alert(
			"Fjerne øvelse",
			"Er du sikker på at du vil fjerne denne øvelsen fra listen din?",
			[
				{ text: "Avbryt", style: "cancel" },
				{
					text: "Fjern",
					onPress: () => removeExercise(exerciseId),
					style: "destructive",
				},
			],
		);
	};

	return (
		<View style={styles.container}>
			<Modal
				visible={isSurveyVisible}
				animationType="slide"
				onRequestClose={closeSurvey}
			>
				{/* Her må du inkludere en komponent for å vise spørsmål og samle svar */}
			</Modal>
			<FlatList
				data={selectedExercises}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.sessionItem}>
						<Image
							source={{
								uri: item.image.replace("localhost", "192.168.10.182"),
							}}
							style={styles.sessionImage}
						/>
						<View style={styles.sessionInfo}>
							<Text style={styles.sessionTitle}>{item.name}</Text>
							<Text style={styles.sessionDescription}>{item.description}</Text>
							<View style={styles.actionsContainer}>
								{completedExercises.includes(item.id) ? (
									<TouchableOpacity>
										<MaterialIcons name="edit" size={24} color="yellow" />
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										onPress={() => handleCompleteExercise(item)}
									>
										<MaterialIcons
											name="check-circle"
											size={24}
											color="green"
										/>
									</TouchableOpacity>
								)}
								<TouchableOpacity onPress={() => handleRemoveExercise(item.id)}>
									<MaterialIcons name="remove-circle" size={24} color="red" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default ExerciseOverviewScreen;
