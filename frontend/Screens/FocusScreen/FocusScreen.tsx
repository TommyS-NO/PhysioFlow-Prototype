import React, { useState, useEffect, useContext } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import BodyChart from "./BodyChart/bodyChart";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import { SurveyContext } from "../../Context/SurveyContext";
import { surveyService } from "../../Services/SurveyService";

type Answer = string | number;
type AnswerMap = Record<string, Answer>;

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
	const [bodySide, setBodySide] = useState("front");
	const [selectedFocusArea, setSelectedFocusArea] = useState<string | null>(
		null,
	);
	const [diagnosisResult, setDiagnosisResult] = useState<any | null>(null);
	const [isDiagnosisModalVisible, setIsDiagnosisModalVisible] = useState(false);

	const { state: surveyState, dispatch: surveyDispatch } =
		useContext(SurveyContext);

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

	const showDiagnosisResult = (diagnosisResult) => {
		Alert.alert(
			"Diagnosis",
			`Your diagnosis is: ${
				diagnosisResult.diagnosis
			}\n\nRecommended exercises:\n${diagnosisResult.exercises.join("\n")}`,
			[{ text: "OK", onPress: () => setDiagnosisResult(diagnosisResult) }],
		);
	};

	const handleSubmitAnswers = async () => {
		try {
			const diagnosis = await surveyService.submitSurvey(
				selectedFocusArea,
				selectedAnswers,
			);
			setIsModalVisible(false);
			showDiagnosisResult(diagnosis);
		} catch (error) {
			// Handle errors such as network issues or server errors
			Alert.alert(
				"Error",
				"There was a problem submitting your answers. Please try again.",
			);
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
		return questionsForPage.map((question) => {
			return (
				<View key={question.id} style={styles.questionContainer}>
					<Text style={styles.questionText}>{question.question}</Text>
					{question.type === "singleChoice" &&
						question.options.map((option) => (
							<TouchableOpacity
								key={option}
								style={
									selectedAnswers[question.id] === option
										? [styles.optionButton, styles.selectedOption]
										: styles.optionButton
								}
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
			);
		});
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
			{isModalVisible && selectedFocusArea && (
				<CustomModal
					visible={isModalVisible}
					onClose={() => setIsModalVisible(false)}
					title={selectedFocusArea}
					style={styles.modalView}
				>
					<Text style={styles.pageNumber}>
						Side {currentPage + 1} av{" "}
						{Math.ceil(surveyState.questions.length / 5)}
					</Text>
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
			)}
			{diagnosisResult && (
				<View style={styles.diagnosisResultView}>
					<Text style={styles.diagnosisTitle}>Diagnosis:</Text>
					<Text style={styles.diagnosisText}>{diagnosisResult.diagnosis}</Text>
					<Text style={styles.exercisesTitle}>Recommended Exercises:</Text>
					{diagnosisResult.exercises.map((exercise, index) => (
						<Text key={index} style={styles.exerciseText}>
							{exercise}
						</Text>
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f2f2f2" },
	content: { flexGrow: 1, paddingTop: 20 },
	questionContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "#ececec",
		padding: 10,
	},
	questionText: { fontSize: 14, color: "#333" },
	optionButton: {
		padding: 10,
		borderRadius: 5,
		margin: 2,
		backgroundColor: "#dddddd",
	},
	selectedOption: { backgroundColor: "green" },
	optionText: { fontSize: 12, color: "black", textAlign: "center" },
	modalView: {
		marginHorizontal: 20,
		marginTop: "10%",
		marginBottom: "10%",
		paddingHorizontal: 15,
		paddingTop: 15,
		paddingBottom: 20,
		borderRadius: 20,
		backgroundColor: "white",
		padding: 35,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: "100%",
		maxHeight: "80%",
	},
	pageNumber: { fontSize: 16, textAlign: "center", marginBottom: 10 },
	resultContainer: { padding: 20 },
	resultTitle: { fontWeight: "bold", fontSize: 16 },
	resultText: { fontSize: 14, marginTop: 5 },
	diagnosisResultView: { padding: 20, alignItems: "center" },
	diagnosisTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
	diagnosisText: { fontSize: 16, marginTop: 10 },
	exercisesTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
	exerciseText: { fontSize: 16, marginTop: 10 },
});

export default FocusScreen;
