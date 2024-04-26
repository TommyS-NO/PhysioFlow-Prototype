import React, { useContext, useState } from "react";
import { View, FlatList, Alert, ScrollView } from "react-native";
import { Exercise, ExerciseContext } from "../../Context/ExerciseContext";
import { useSurvey } from "../../Context/SurveyContext";
import { useUser } from "../../Context/UserContext";
import { styles } from "./ExerciseOverviewScreen_Style";
import CustomModal from "../../Components/CustomModal/CustomModal";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ExerciseItem from "./ExerciseItemComponent";
import QuestionItem from "./QuestionItemComponent";

const ExerciseOverviewScreen = () => {
	const { selectedExercises, removeExercise, updateExerciseStatus } =
		useContext(ExerciseContext);
	const {
		state: surveyState,
		dispatch: surveyDispatch,
		loadSurvey,
	} = useSurvey();
	const { state: userState, completeExercise } = useUser();
	const [isSurveyVisible, setSurveyVisible] = useState(false);
	const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

	const handleCompleteExercise = async (exercise: Exercise) => {
		console.log("Selected exercise ID:", exercise.id); // Log for debugging SLETT!!
		if (!exercise.id) {
			console.error(
				"Error: exerciseId is undefined when trying to complete an exercise.",
			);
			return;
		}

		try {
			await loadSurvey("followup");
			setActiveExerciseId(exercise.id);
			setSurveyVisible(true);
		} catch (error) {
			console.error("Error loading survey:", error);
		}
	};

	const handleAnswerChange = (questionId: string, answer: string | number) => {
		surveyDispatch({
			type: "ANSWER_QUESTION",
			questionId,
			answer: { questionId, answer },
		});
	};

	const handleSubmit = async () => {
		if (
			Object.keys(surveyState.answers).length === surveyState.questions.length
		) {
			try {
				await completeExercise(
					userState.userId,
					activeExerciseId,
					surveyState.answers,
				);
				updateExerciseStatus(activeExerciseId, "completed");
				setSurveyVisible(false);
				setActiveExerciseId(null);
			} catch (error) {
				console.error("Error completing exercise:", error);
			}
		} else {
			Alert.alert(
				"Advarsel",
				"Vennligst svar på alle spørsmålene før du markerer øvelsen som gjennomført.",
			);
		}
	};

	const closeSurvey = () => {
		setSurveyVisible(false);
		setActiveExerciseId(null);
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
			<CustomModal
				visible={isSurveyVisible}
				onClose={closeSurvey}
				style={styles.modalView}
			>
				<ScrollView>
					{surveyState.questions.map((question) => (
						<QuestionItem
							key={question.id}
							question={question}
							onAnswer={handleAnswerChange}
							answer={
								surveyState.answers[question.id] || {
									questionId: question.id,
									answer: "",
								}
							}
						/>
					))}
				</ScrollView>
				<CustomButton title="Bekreft" onPress={handleSubmit} />
			</CustomModal>
			<FlatList
				data={selectedExercises}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ExerciseItem
						exercise={item}
						onEdit={() => console.log(`Rediger øvelse ${item.id}`)}
						onComplete={() => handleCompleteExercise(item)}
						onRemove={() => handleRemoveExercise(item.id)}
						isActive={isSurveyVisible && activeExerciseId === item.id}
					/>
				)}
			/>
		</View>
	);
};

export default ExerciseOverviewScreen;
