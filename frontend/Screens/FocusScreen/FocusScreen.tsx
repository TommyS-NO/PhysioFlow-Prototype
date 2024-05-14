import React, { useState, useEffect, useContext } from "react";
import {
	View,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	Platform,
	ScrollView,
	Alert,
} from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import BodyChart from "./BodyChart/bodyChart";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import { SurveyContext } from "../../Context/SurveyContext";
import { useUser } from "../../Context/UserContext";
import { useSurvey } from "../../Context/SurveyContext";
import { styles } from "./FocusScreen_Style";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";
import { db } from "../../Services/Firebase/FirebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import { apiService } from "../../Services/ApiService";

type Answer = string | number;
type AnswerMap = Record<string, Answer>;

interface DiagnosisResult {
	diagnosis: string;
	description: string;
	exercises: string[];
	timestamp: string;
}

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
	const [bodySide, setBodySide] = useState<"front" | "back">("front");
	const [selectedFocusArea, setSelectedFocusArea] = useState<string | null>(
		null,
	);
	const { state: surveyState, dispatch: surveyDispatch } =
		useContext(SurveyContext);
	const [diagnosisResult, setDiagnosisResult] =
		useState<DiagnosisResult | null>(null);
	const [unansweredHighlight, setUnansweredHighlight] = useState(false);
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const questionsPerPage = 4;
	const { state: userState } = useUser();

	useEffect(() => {
		if (selectedFocusArea) {
			apiService.getSurvey(selectedFocusArea).then((data) => {
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
		setUnansweredHighlight(false);
	};

	const handleAnswerChange = (questionId: string, answer: Answer) => {
		setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
		if (unansweredHighlight) {
			setUnansweredHighlight(false);
		}
		surveyDispatch({
			type: "ANSWER_QUESTION",
			questionId,
			answer: { questionId, answer },
		});
	};

	const handleSubmitAnswers = async () => {
		try {
			const response = await apiService.submitSurvey(
				selectedFocusArea ?? "",
				selectedAnswers,
			);

			const diagnosisData = {
				diagnosis: response.diagnosis,
				title: response.diagnosis,
				description: response.description,
				exercises: response.exercises,
				timestamp: new Date().toISOString(),
			};

			await setDoc(
				doc(collection(db, "users", userState.userId, "diagnoses")),
				diagnosisData,
			);

			surveyDispatch({
				type: "SAVE_DIAGNOSIS",
				diagnosis: diagnosisData,
			});

			setDiagnosisResult(diagnosisData);
			setIsModalVisible(false);
		} catch (error) {
			console.error("Error submitting answers and saving diagnosis:", error);
		}
	};

	const handleNext = () => {
		const questionsForPage = surveyState.questions.slice(
			currentPage * questionsPerPage,
			(currentPage + 1) * questionsPerPage,
		);
		const allAnswered = questionsForPage.every(
			(question) => selectedAnswers[question.id] !== undefined,
		);

		if (!allAnswered) {
			Alert.alert(
				"Advarsel",
				"Vennligst svar på alle spørsmålene før du går videre.",
			);
			setUnansweredHighlight(true);
			return;
		}

		const nextPage = currentPage + 1;
		if (nextPage < Math.ceil(surveyState.questions.length / questionsPerPage)) {
			setCurrentPage(nextPage);
		} else {
			handleSubmitAnswers();
		}
	};

	const handlePrevious = () => {
		const previousPage = currentPage - 1;
		if (previousPage >= 0) {
			setCurrentPage(previousPage);
		}
	};

	const renderQuestionsForPage = () => {
		const questionsForPage = surveyState.questions.slice(
			currentPage * questionsPerPage,
			(currentPage + 1) * questionsPerPage,
		);
		return questionsForPage.map((question) => (
			<View
				key={question.id}
				style={[
					styles.questionContainer,
					unansweredHighlight &&
						selectedAnswers[question.id] === undefined &&
						styles.unansweredQuestion,
				]}
			>
				<Text style={styles.questionText}>{question.question}</Text>
				{question.type === "singleChoice" && (
					<View
						style={
							question.options.length === 2
								? styles.horizontalOptionsContainer
								: styles.verticalOptionsContainer
						}
					>
						{question.options.map((option) => (
							<TouchableOpacity
								key={option}
								style={[
									styles.optionButton,
									selectedAnswers[question.id] === option &&
										styles.selectedOption,
								]}
								onPress={() => handleAnswerChange(question.id, option)}
							>
								<Text
									style={[
										styles.optionText,
										selectedAnswers[question.id] === option &&
											styles.selectedOptionText,
									]}
								>
									{option}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
				{question.type === "slider" && (
					<CustomSlider
						value={Number(selectedAnswers[question.id]) || question.minValue}
						onValueChange={(value) => handleAnswerChange(question.id, value)}
						maximumValue={question.maxValue}
						minimumValue={question.minValue}
						title={question.title}
					/>
				)}
			</View>
		));
	};

	//Måtte legge til denne for å overstyre bredden på CustomButton. Ok å ha det sånn?
	const buttonWidth = {
		width: "45%",
		marginHorizontal: 5,
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
				title={selectedFocusArea || "Velg område"}
				style={styles.modalView}
			>
				<ScrollView>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						{renderQuestionsForPage()}
					</KeyboardAvoidingView>
				</ScrollView>
				<Text style={styles.pageInfo}>
					Side {currentPage + 1} av{" "}
					{Math.ceil(surveyState.questions.length / questionsPerPage)}
				</Text>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					{currentPage > 0 && (
						<CustomButton
							title="Tilbake"
							onPress={handlePrevious}
							size="medium"
							buttonStyle={buttonWidth}
						/>
					)}
					<CustomButton
						title={
							currentPage ===
							Math.ceil(surveyState.questions.length / questionsPerPage) - 1
								? "Bekreft"
								: "Neste"
						}
						onPress={handleNext}
						size="medium"
						buttonStyle={buttonWidth}
					/>
				</View>
			</CustomModal>
			{diagnosisResult && (
				<CustomModal
					visible={true}
					onClose={() => setDiagnosisResult(null)}
					title="Antatt diagnose:"
					style={styles.modalView}
				>
					<Text style={styles.diagnosisTitle}>{diagnosisResult.diagnosis}</Text>
					<Text style={styles.diagnosisText}>
						{diagnosisResult.description}
					</Text>
					<CustomButton
						title="Vis anbefalte øvelser"
						onPress={() =>
							navigation.navigate("ExerciseScreen", {
								recommendedExercises: diagnosisResult.exercises,
							})
						}
						size="medium"
					/>
				</CustomModal>
			)}
			<FooterNavigation />
		</View>
	);
};

export default FocusScreen;
