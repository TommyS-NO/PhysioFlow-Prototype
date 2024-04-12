import React, { useState, useEffect, useContext, useRef } from "react";
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

interface Question {
	id: string;
	type: string;
	question: string;
	options?: string[];
	minValue?: number;
	maxValue?: number;
}

interface Answer {
	[questionId: string]: string | number;
}

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<Answer>({});
	const [bodySide, setBodySide] = useState("front");
	const [selectedFocusArea, setSelectedFocusArea] = useState<string | null>(
		null,
	);
	const { state: surveyState, dispatch: surveyDispatch } =
		useContext(SurveyContext);
	const [diagnosisResult, setDiagnosisResult] = useState<{
		diagnosis: string;
		exercises: string[];
	} | null>(null);

	const scrollViewRef = useRef<ScrollView | null>(null);

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

	const handleAreaPress = (area: string) => {
		setSelectedFocusArea(area);
		setIsModalVisible(true);
		setCurrentPage(0);
	};

	const handleAnswerChange = (questionId: string, answer: string | number) => {
		setSelectedAnswers((prevState) => ({ ...prevState, [questionId]: answer }));
		surveyDispatch({
			type: "ANSWER_QUESTION",
			questionId,
			answer: { questionId, answer },
		});
	};

	const isAnswered = (questionId: string) =>
		selectedAnswers[questionId] !== undefined;
	const totalNumberOfPages = Math.ceil(surveyState.questions.length / 5);

	const pageQuestions = surveyState.questions.slice(
		currentPage * 5,
		(currentPage + 1) * 5,
	);

	const canProceed =
		pageQuestions.every((question) => isAnswered(question.id)) &&
		(currentPage < totalNumberOfPages - 1 ||
			Object.keys(selectedAnswers).length === surveyState.questions.length);

	const handleSubmitAnswers = () => {
		setIsModalVisible(false);
		setDiagnosisResult({
			diagnosis: "Some Diagnosis",
			exercises: ["Exercise 1", "Exercise 2"],
		});
		Alert.alert("Resultat", "Dine svar har blitt sendt.");
	};

	const handleNext = () => {
		const nextPage = currentPage + 1;
		const totalQuestions = surveyState.questions.length;
		if (nextPage < Math.ceil(totalQuestions / 5)) {
			setCurrentPage(nextPage);
		} else {
			if (selectedAnswers.openTextQuestion) {
				handleSubmitAnswers();
			} else {
				Alert.alert("Error", "Please fill in the open text question.");
			}
		}
	};

	const renderQuestionsForPage = () => {
		return pageQuestions.map((question: Question) => {
			if (question.type === "singleChoice") {
				return (
					<View key={question.id} style={styles.questionContainer}>
						<Text style={styles.questionText}>{question.question}</Text>
						{question.options?.map((option) => (
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
					</View>
				);
			}
			if (question.type === "slider") {
				return (
					<View key={question.id} style={styles.questionContainer}>
						<Text style={styles.questionText}>{question.question}</Text>
						<CustomSlider
							value={
								(selectedAnswers[question.id] as number) || question.minValue
							}
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
					<Text style={styles.pageNumber}>
						Side {currentPage + 1} av {totalNumberOfPages}
					</Text>
					<ScrollView
						ref={scrollViewRef}
						contentContainerStyle={{ paddingTop: 20 }}
					>
						{renderQuestionsForPage()}
					</ScrollView>
					<CustomButton
						title={currentPage === totalNumberOfPages - 1 ? "Bekreft" : "Neste"}
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
	pageNumber: { fontSize: 16, textAlign: "center", marginBottom: 10 },
	resultContainer: { padding: 20 },
	resultTitle: { fontWeight: "bold", fontSize: 16 },
	resultText: { fontSize: 14, marginTop: 5 },
});

export default FocusScreen;
