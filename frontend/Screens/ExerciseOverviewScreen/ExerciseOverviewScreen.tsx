import React, { useContext, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	Alert,
	ScrollView,
	TextInput,
} from "react-native";
import { Exercise, ExerciseContext } from "../../Context/ExerciseContext";
import { SurveyQuestion, useSurvey, Answer } from "../../Context/SurveyContext";
import { styles } from "./ExerciseOverviewScreen_Style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomModal from "../../Components/CustomModal/CustomModal";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { useUser } from "../../Context/UserContext";

interface SurveyQuestionsProps {
	questions: SurveyQuestion[];
	onAnswer: (questionId: string, answer: string | number) => void;
	answers: Record<string, Answer>;
}

const SurveyQuestions = ({
	questions,
	onAnswer,
	answers,
}: SurveyQuestionsProps) => {
	return (
		<ScrollView>
			{questions.map((question) => {
				const answerValue = answers[question.id]?.answer || "";
				return (
					<View key={question.id} style={styles.questionContainer}>
						<Text style={styles.questionTitle}>{question.question}</Text>
						{question.type === "slider" && (
							<CustomSlider
								value={Number(answerValue) || question.minValue}
								onValueChange={(value) => onAnswer(question.id, value)}
								maximumValue={question.maxValue}
								minimumValue={question.minValue}
								title={question.title}
							/>
						)}
						{question.type === "numericInput" && (
							<View style={styles.timeInputContainer}>
								<Text style={styles.timeInputLabel}>Tid:</Text>
								<TextInput
									style={styles.textInput}
									value={String(answerValue)}
									onChangeText={(value) => {
										const numericValue = parseFloat(value);
										if (!Number.isNaN(numericValue) && value.length <= 10) {
											onAnswer(question.id, numericValue);
										}
									}}
									keyboardType="numeric"
								/>
							</View>
						)}
					</View>
				);
			})}
		</ScrollView>
	);
};

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

	const handleSubmit = () => {
		if (
			Object.keys(surveyState.answers).length === surveyState.questions.length
		) {
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
				<SurveyQuestions
					questions={surveyState.questions}
					onAnswer={handleAnswerChange}
					answers={surveyState.answers}
				/>
				<CustomButton title="Bekreft" onPress={handleSubmit} />
			</CustomModal>
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
								{activeExerciseId === item.id ? (
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
										<Text style={styles.completeText}>Gjennomfør</Text>
									</TouchableOpacity>
								)}
								<TouchableOpacity onPress={() => handleRemoveExercise(item.id)}>
									<MaterialIcons name="remove-circle" size={24} color="red" />
									<Text style={styles.removeText}>Slett</Text>
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
