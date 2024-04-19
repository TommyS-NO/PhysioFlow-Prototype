import React, { useState, useEffect, useContext } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import BodyChart from "./BodyChart/bodyChart";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import { SurveyContext } from "../../Context/SurveyContext";
import { surveyService } from "../../Services/SurveyService";
import { styles } from "../FocusScreen/FocusScreen_Style";

type Answer = string | number;
type AnswerMap = Record<string, Answer>;

type DiagnosisResult = {
	diagnosis: string;
	description: string;
	exercises: string[];
};

type ExerciseDetail = {
	description: string;
	image: string;
};

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
	const [bodySide, setBodySide] = useState("front");
	const [selectedFocusArea, setSelectedFocusArea] = useState<string | null>(
		null,
	);
	const { state: surveyState, dispatch: surveyDispatch } =
		useContext(SurveyContext);
	const [diagnosisResult, setDiagnosisResult] =
		useState<DiagnosisResult | null>(null);
	const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetail[]>([]);

	useEffect(() => {
		if (selectedFocusArea) {
			surveyService.getSurvey(selectedFocusArea).then((data) => {
				surveyDispatch({
					type: "LOAD_SURVEY",
					surveyId: selectedFocusArea,
					questions: data.questions,
				});
			});
		}
	}, [selectedFocusArea, surveyDispatch]);

	const handleAreaPress = (area: string) => {
		setSelectedFocusArea(area);
		setIsModalVisible(true);
		setCurrentPage(0);
	};

	const handleAnswerChange = (questionId: string, answer: Answer) => {
		setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
		surveyDispatch({
			type: "ANSWER_QUESTION",
			questionId,
			answer: { questionId, answer },
		});
	};

	const handleContactProvider = () => {
		console.log("Contact provider action here");
	};

	const handleViewExercises = async () => {
		if (diagnosisResult && diagnosisResult.exercises.length > 0) {
			try {
				const exerciseDetailsResponse = await surveyService.getExerciseDetails(
					diagnosisResult.exercises,
				);
				setExerciseDetails(exerciseDetailsResponse);
				setIsExerciseModalVisible(true);
			} catch (error) {
				console.error("Failed to load exercise details: ", error);
			}
		}
	};

	const handleSubmitAnswers = async () => {
		try {
			const response = await surveyService.submitSurvey(
				selectedFocusArea ?? "",
				selectedAnswers,
			);
			setDiagnosisResult({
				diagnosis: response.diagnosis,
				description: response.description,
				exercises: response.exercises,
			});
			setIsModalVisible(false);
		} catch (error) {
			console.error("Error submitting answers: ", error);
		}
	};

	const handleNext = () => {
		const nextPage = currentPage + 1;
		if (nextPage < Math.ceil(surveyState.questions.length / 5)) {
			setCurrentPage(nextPage);
		} else {
			handleSubmitAnswers();
		}
	};

	const renderQuestionsForPage = () => {
		const questionsForPage = surveyState.questions.slice(
			currentPage * 5,
			(currentPage + 1) * 5,
		);
		return questionsForPage.map((question) => (
			<View key={question.id} style={styles.questionContainer}>
				<Text style={styles.questionText}>{question.question}</Text>
				{question.type === "singleChoice" &&
					question.options.map((option) => (
						<TouchableOpacity
							key={option}
							style={[
								styles.optionButton,
								selectedAnswers[question.id] === option &&
									styles.selectedOption,
							]}
							onPress={() => handleAnswerChange(question.id, option)}
						>
							<Text style={styles.optionText}>{option}</Text>
						</TouchableOpacity>
					))}
				{question.type === "slider" && (
					<CustomSlider
						value={selectedAnswers[question.id] || question.minValue}
						onValueChange={(value) => handleAnswerChange(question.id, value)}
						maximumValue={question.maxValue}
						minimumValue={question.minValue}
					/>
				)}
			</View>
		));
	};

	return (
		<View style={styles.container}>
			<BodyChart
				bodySide={bodySide}
				onAreaPress={handleAreaPress}
				toggleBodySide={() =>
					setBodySide(bodySide === "front" ? "back" : "front")
				}
			/>
			<CustomModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				title={selectedFocusArea ?? ""}
				style={styles.modalView}
			>
				<ScrollView style={styles.content}>
					{renderQuestionsForPage()}
				</ScrollView>
				<CustomButton
					title={
						currentPage === Math.ceil(surveyState.questions.length / 5) - 1
							? "Bekreft"
							: "Neste"
					}
					onPress={handleNext}
				/>
			</CustomModal>
			{diagnosisResult && (
				<CustomModal
					visible={true}
					onClose={() => setDiagnosisResult(null)}
					title="Antatt diagnose"
					style={styles.modalView}
				>
					<Text style={styles.diagnosisTitle}>{diagnosisResult.diagnosis}</Text>
					<Text style={styles.diagnosisText}>
						{diagnosisResult.description}
					</Text>
					<CustomButton
						title="Kontakt behandler"
						onPress={handleContactProvider}
					/>
					<CustomButton
						title="Vis anbefalte øvelser"
						onPress={handleViewExercises}
					/>
				</CustomModal>
			)}

			{isExerciseModalVisible && (
				<CustomModal
					visible={isExerciseModalVisible}
					onClose={() => setIsExerciseModalVisible(false)}
					title="Anbefalte øvelser"
					style={styles.modalView}
				>
					<ScrollView style={styles.content}>
						{exerciseDetails.map((exercise, index) => {
							console.log(`Exercise #${index}:`, exercise);

							return (
								<View key={index} style={styles.exerciseDetailContainer}>
									<Text style={styles.exerciseTitle}>
										{diagnosisResult.exercises[index]}
									</Text>
									<Text style={styles.exerciseDescription}>
										{exercise.description}
									</Text>
									<Image
										source={{
											uri: exercise.image.replace(
												"localhost",
												"192.168.68.54",//"192.168.10.182" Tommy IP
											),
										}}
										style={styles.exerciseImage}
									/>
								</View>
							);
						})}
					</ScrollView>
				</CustomModal>
			)}
		</View>
	);
};



export default FocusScreen;