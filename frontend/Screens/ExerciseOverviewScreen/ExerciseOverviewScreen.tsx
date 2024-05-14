import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, Text, ScrollView } from "react-native";
import { useExercises } from "../../Context/ExerciseContext";
import { useSurvey } from "../../Context/SurveyContext";
import { useUser } from "../../Context/UserContext";
import CustomModal from "../../Components/CustomModal/CustomModal";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ExerciseItem from "./ExerciseItemComponent";
import QuestionItem from "./QuestionItemComponent";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";
import { styles } from "./ExerciseOverviewScreen_Style";

const ExerciseOverviewScreen: React.FC = () => {
	const { state, fetchExercises, removeExercise, updateExerciseStatus } =
		useExercises();
	const { userExercises, completedExercises } = state;

	console.log("User Exercises from context:", userExercises); // Log user exercises from context
	console.log("Completed Exercises from context:", completedExercises); // Log completed exercises from context

	const {
		state: surveyState,
		dispatch: surveyDispatch,
		loadSurvey,
	} = useSurvey();
	const { state: userState, completeExercise } = useUser();
	const [isSurveyVisible, setSurveyVisible] = useState(false);
	const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

	useEffect(() => {
		console.log("Fetching exercises..."); // Log before fetching
		fetchExercises();
	}, [fetchExercises]);

	// useEffect(() => {
	// 	console.log("Exercises fetched and rendered:", userExercises, completedExercises);
	// }, [userExercises, completedExercises]);

	const handleCompleteExercise = async (exerciseId: string) => {
		console.log(`Completing exercise with id ${exerciseId}`); // Log which exercise is being completed
		try {
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

	const handleAnswerChange = (questionId: string, answer: string | number) => {
		console.log(`Answering question ${questionId} with answer ${answer}`); // Log question answers
		surveyDispatch({
			type: "ANSWER_QUESTION",
			questionId,
			answer: { questionId, answer },
		});
	};

	const handleSubmit = async () => {
		console.log("Submitting survey..."); // Log before submitting
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
		console.log("Closing survey..."); // Log when closing survey
		setSurveyVisible(false);
		setActiveExerciseId(null);
	};

	const handleRemoveExercise = (exerciseId: string) => {
		console.log(`Removing exercise with id ${exerciseId}`); // Log which exercise is being removed
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
