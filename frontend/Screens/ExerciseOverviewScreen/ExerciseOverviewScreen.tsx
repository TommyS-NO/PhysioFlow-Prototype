import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Alert, ScrollView } from "react-native";
import { useExercises } from "../../Context/ExerciseContext/ExerciseContext";
import { useSurvey } from "../../Context/SurveyContext/SurveyContext";
import { useUser } from "../../Context/UserContext";
import CustomModal from "../../Components/CustomModal/CustomModal";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ExerciseItem from "./components/ExerciseItem";
import QuestionItem from "./components/QuestionItem";
import FooterNavigation from "../../Navigation/FooterNavigation/FooterNavigation";
import { styles } from "./ExerciseOverviewScreen_Style";

const ExerciseOverviewScreen: React.FC = () => {
	const { state, fetchExercises, removeExercise, updateExerciseStatus } =
		useExercises();
	const { userExercises, completedExercises } = state;
	const {
		state: surveyState,
		dispatch: surveyDispatch,
		loadSurvey,
	} = useSurvey();
	const { state: userState, completeExercise } = useUser();
	const [isSurveyVisible, setSurveyVisible] = useState(false);
	const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

	useEffect(() => {
		fetchExercises();
	}, [fetchExercises]);

	const handleCompleteExercise = async (exerciseId: string) => {
		try {
			surveyDispatch({ type: "RESET_SURVEY" });
			await loadSurvey("followup");
			setActiveExerciseId(exerciseId);
			setSurveyVisible(true);
		} catch (error) {
			Alert.alert(
				"Error",
				`Could not load the survey: ${(error as Error).message}`,
			);
		}
	};

	const handleAnswerChange = useCallback(
		(questionId: string, answer: string | number) => {
			surveyDispatch({
				type: "ANSWER_QUESTION",
				questionId,
				answer: { questionId, answer },
			});
		},
		[surveyDispatch],
	);

	const handleSubmit = async () => {
		const allAnswered = surveyState.questions.every((question) => {
			const answer = surveyState.answers[question.id];
			return (
				answer !== undefined && (answer.answer !== "" || answer.answer === 0)
			);
		});

		if (allAnswered && activeExerciseId) {
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
		surveyDispatch({ type: "RESET_SURVEY" });
	};

	const handleRemoveExercise = (exerciseId: string) => {
		Alert.alert(
			"Fjerne øvelse",
			"Er du sikker på at du vil fjerne denne øvelsen fra listen din?",
			[
				{ text: "Avbryt", style: "cancel" },
				{
					text: "Fjern",
					style: "destructive",
					onPress: () => removeExercise(exerciseId),
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
				data={[...userExercises, ...completedExercises]}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ExerciseItem
						exercise={item}
						onEdit={() => console.log(`Rediger øvelse ${item.id}`)}
						onComplete={() => handleCompleteExercise(item.id)}
						onRemove={() => handleRemoveExercise(item.id)}
						isActive={isSurveyVisible && activeExerciseId === item.id}
					/>
				)}
			/>
			<FooterNavigation />
		</View>
	);
};

export default ExerciseOverviewScreen;
