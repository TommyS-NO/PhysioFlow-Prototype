import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
} from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import BodyChart from "./BodyChart/bodyChart";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { useQuestion } from "../../Context/QuestionContext";
import { FocusAreaKey, useFocusArea } from "../../Context/FocusContext";
import { questionService } from "../../Services/questionService";

interface Question {
	id: string;
	text: string;
	options: string[];
}

interface Answer {
	[questionId: string]: string;
}

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [bodySide, setBodySide] = useState<"front" | "back">("front");
	const { state: focusState, dispatch: focusDispatch } = useFocusArea();
	const [answers, setAnswers] = useState<Record<string, Answer>>({});
	const [generalQuestions, setGeneralQuestions] = useState<Question[]>([]);

	useEffect(() => {
		const fetchGeneralQuestions = async () => {
			const fetchedQuestions = await questionService.getGeneralQuestions();
			setGeneralQuestions(fetchedQuestions.questions);
		};

		fetchGeneralQuestions();
	}, []);

	const handleAreaPress = (area: FocusAreaKey) => {
		focusDispatch({ type: "SET_AREA", area, isSelected: true });
		setIsModalVisible(true);
		// Set answers for the new area
		setAnswers((prev) => ({ ...prev, [area]: {} }));
	};

	const handleSelectAnswer = (
		area: FocusAreaKey,
		questionId: string,
		option: string,
	) => {
		setAnswers((prev) => ({
			...prev,
			[area]: { ...(prev[area] || {}), [questionId]: option },
		}));
	};

	const handleConfirmAnswers = () => {
		setIsModalVisible(false);
		// Submit answers somewhere or handle navigation
	};

	const toggleBodySide = () => {
		setBodySide((prevSide) => (prevSide === "front" ? "back" : "front"));
	};

	const currentFocusArea = focusState.currentFocusArea;
	const currentAnswers = answers[currentFocusArea] || {};

	const allQuestionsAnswered =
		generalQuestions.length > 0 &&
		generalQuestions.every(
			(question) => currentAnswers[question.id] !== undefined,
		);

	const getButtonStyle = (questionId: string, option: string) => {
		const isSelected = currentAnswers[questionId] === option;
		return [
			styles.optionButton,
			isSelected
				? option === "Ja"
					? styles.optionButtonYesSelected
					: styles.optionButtonNoSelected
				: {},
		];
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.content}>
				<BodyChart
					bodySide={bodySide}
					onAreaPress={handleAreaPress}
					toggleBodySide={toggleBodySide}
				/>
				{isModalVisible && (
					<CustomModal
						visible={isModalVisible}
						onClose={() => setIsModalVisible(false)}
						style={styles.modalView}
					>
						<View style={styles.modalTitleContainer}>
							<Text style={styles.modalTitle}>{currentFocusArea}</Text>
							<Text style={styles.modalSubtitle}>Generelle Spørsmål</Text>
						</View>
						{generalQuestions.map((question) => (
							<View key={question.id} style={styles.questionContainer}>
								<Text style={styles.questionText}>{question.text}</Text>
								<View style={styles.optionsContainer}>
									{question.options.map((option) => (
										<TouchableOpacity
											key={option}
											style={getButtonStyle(question.id, option)}
											onPress={() =>
												handleSelectAnswer(
													currentFocusArea,
													question.id,
													option,
												)
											}
										>
											<Text style={styles.optionText}>{option}</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>
						))}
						<CustomButton
							title="Bekreft"
							onPress={handleConfirmAnswers}
							disabled={!allQuestionsAnswered}
						/>
					</CustomModal>
				)}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f2f2f2",
	},
	content: {
		flexGrow: 1,
		paddingTop: 20,
	},
	questionContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "#ececec",
		padding: 10,
	},
	questionText: {
		fontSize: 14, // Mindre fontstørrelse
		color: "#333",
	},

	optionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	optionButton: {
		padding: 10,
		borderRadius: 5,
		margin: 2,
		width: 100,
		// flex: 1,
	},
	optionButtonYesSelected: {
		backgroundColor: "lightgreen", // Stil for valgt 'Ja'-knapp
	},
	optionButtonNoSelected: {
		backgroundColor: "red", // Stil for valgt 'Nei'-knapp
	},
	optionText: {
		fontSize: 12,
		color: "black",
		textAlign: "center",
	},
	confirmButton: {
		backgroundColor: "#4CAF50",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		marginVertical: 20,
	},
	confirmButtonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
	disabledConfirmButton: {
		backgroundColor: "#9E9E9E",
	},
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
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	modalTitleContainer: {
		// ... Add styles for the title container
	},
	modalTitle: {
		// ... Add styles for the title
	},
	modalSubtitle: {
		// ... Add styles for the subtitle
	},
	// ... Add other styles as needed
});

export default FocusScreen;
function setCurrentFocusArea(area: string) {
	throw new Error("Function not implemented.");
}
