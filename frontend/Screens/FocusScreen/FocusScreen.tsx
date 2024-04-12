import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import BodyChart from "./BodyChart/bodyChart";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import { SurveyContext } from "../../Context/SurveyContext";
import { surveyService } from "../../Services/SurveyService";

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [bodySide, setBodySide] = useState("front");
	const [selectedFocusArea, setSelectedFocusArea] = useState(null);
	const { state: surveyState, dispatch: surveyDispatch } =
		useContext(SurveyContext);
	const [diagnosisResult, setDiagnosisResult] = useState(null);

	useEffect(() => {
		if (selectedFocusArea) {
			const fetchSurvey = async () => {
				const data = await surveyService.getSurvey(selectedFocusArea);
				surveyDispatch({
					type: "LOAD_SURVEY",
					surveyId: selectedFocusArea,
					questions: data.questions,
				});
			};
			fetchSurvey();
		}
	}, [selectedFocusArea, surveyDispatch]);

	const handleAreaPress = (area) => {
		setSelectedFocusArea(area);
		setIsModalVisible(true);
		setCurrentPage(0);
	};

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevState) => ({ ...prevState, [questionId]: answer }));
		surveyDispatch({
			type: "ANSWER_QUESTION",
			questionId,
			answer: { questionId, answer },
		});
	};

	const isAnswered = (questionId) => selectedAnswers[questionId] !== undefined;

	const canProceed =
		currentPage < surveyState.questions.length / 5 - 1 ||
		Object.keys(selectedAnswers).length === surveyState.questions.length;

	const handleSubmitAnswers = () => {
		setIsModalVisible(false);
		setDiagnosisResult({
			diagnosis: "Some Diagnosis",
			exercises: ["Exercise 1", "Exercise 2"],
		});
		Alert.alert("Resultat", "Dine svar har blitt sendt.");
	};

	const handleNext = () => {
		if (canProceed) {
			setCurrentPage(currentPage + 1);
			if (currentPage === surveyState.questions.length / 5 - 1) {
				handleSubmitAnswers();
			}
		}
	};

	const renderQuestionsForPage = () => {
		const pageQuestions = surveyState.questions.slice(
			currentPage * 5,
			(currentPage + 1) * 5,
		);
		return pageQuestions.map((question) => {
			if (question.type === "singleChoice") {
				return (
					<View key={question.id} style={styles.questionContainer}>
						<Text style={styles.questionText}>{question.question}</Text>
						{question.options.map((option) => (
							<TouchableOpacity
								key={option}
								style={[
									styles.optionButton,
									isAnswered(question.id) && styles.selectedOption,
								]}
								onPress={() => handleAnswerChange(question.id, option)}
							>
								<Text style={styles.optionText}>{option}</Text>
							</TouchableOpacity>
						))}
					</View>
				);
			} else if (question.type === "slider") {
				return (
					<View key={question.id} style={styles.questionContainer}>
						<Text style={styles.questionText}>{question.question}</Text>
						<CustomSlider
							value={selectedAnswers[question.id] || question.minValue}
							onValueChange={(value) => handleAnswerChange(question.id, value)}
							maximumValue={question.maxValue}
							minimumValue={question.minValue}
						/>
					</View>
				);
			}
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
					{renderQuestionsForPage()}
					<CustomButton
						title={
							currentPage === surveyState.questions.length / 5 - 1
								? "Submit"
								: "Next"
						}
						onPress={handleNext}
						disabled={!canProceed}
					/>
				</CustomModal>
			)}
			{diagnosisResult && (
				<View style={styles.resultContainer}>
					<Text style={styles.resultTitle}>
						Diagnosis and Recommended Exercises:
					</Text>
					<Text style={styles.resultText}>{diagnosisResult.diagnosis}</Text>
					{diagnosisResult.exercises.map((exercise, index) => (
						<Text key={index} style={styles.resultText}>
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
	resultContainer: { padding: 20 },
	resultTitle: { fontWeight: "bold", fontSize: 16 },
	resultText: { fontSize: 14, marginTop: 5 },
});

export default FocusScreen;
