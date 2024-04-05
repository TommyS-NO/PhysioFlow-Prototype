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
import { useFocusArea } from "../../Context/FocusContext";
import { questionService } from "../../Services/questionService";

type FocusAreaKey =
	| "Nakke"
	| "Skulder"
	| "Albue"
	| "Håndledd"
	| "Øvre_rygg"
	| "Nedre_rygg"
	| "Hofte"
	| "Kne"
	| "Ankel";

interface Question {
	id: string;
	text: string;
	options: string[];
}

interface Answers {
	[key: string]: { [questionId: string]: string };
}

const FocusScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [bodySide, setBodySide] = useState<"front" | "back">("front");
	const { state: focusState, dispatch: focusDispatch } = useFocusArea();
	const [answers, setAnswers] = useState<Answers>({});
	const [generalQuestions, setGeneralQuestions] = useState<Question[]>([]);
	const [nextEnabled, setNextEnabled] = useState(false);

	useEffect(() => {
		questionService.getGeneralQuestions().then((fetchedQuestions) => {
			setGeneralQuestions(fetchedQuestions.questions);
		});
	}, []);

	const handleAreaPress = (area: FocusAreaKey) => {
		focusDispatch({ type: "SET_CURRENT_FOCUS_AREA", area });
		setIsModalVisible(true);
		if (!answers[area]) {
			setAnswers((prev) => ({ ...prev, [area]: {} }));
		} else {
			setAnswers((prev) => ({ ...prev, [area]: answers[area] }));
		}
	};

	const handleSelectAnswer = (questionId: string, option: string) => {
		const currentArea = focusState.currentFocusArea;
		if (currentArea) {
			setAnswers((prev) => ({
				...prev,
				[currentArea]: {
					...prev[currentArea],
					[questionId]: option,
				},
			}));
		}
	};

	const handleConfirmAnswers = () => {
		setIsModalVisible(false);
		const currentArea = focusState.currentFocusArea;
		if (currentArea) {
			setNextEnabled(areAllQuestionsAnswered(currentArea));
		}
	};
	const currentAnswers = answers[focusState.currentFocusArea || ""] || {};

	const allQuestionsAnswered =
		generalQuestions.length > 0 &&
		generalQuestions.every(
			(question) => currentAnswers[question.id] !== undefined,
		);
	const areAllQuestionsAnswered = (area: FocusAreaKey) => {
		return generalQuestions.every(
			(question) => answers[area] && answers[area][question.id] !== undefined,
		);
	};

	const currentFocusArea = focusState.currentFocusArea;

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
					toggleBodySide={() =>
						setBodySide(bodySide === "front" ? "back" : "front")
					}
				/>
				{isModalVisible && focusState.currentFocusArea && (
					<CustomModal
						visible={isModalVisible}
						onClose={() => setIsModalVisible(false)}
						title={focusState.currentFocusArea}
						style={styles.modalView}
					>
						<Text style={styles.modalSubtitle}>Generelle Spørsmål</Text>
						{generalQuestions.map((question) => (
							<View key={question.id} style={styles.questionContainer}>
								<Text style={styles.questionText}>{question.text}</Text>
								<View style={styles.optionsContainer}>
									{question.options.map((option) => (
										<TouchableOpacity
											key={option}
											style={getButtonStyle(question.id, option)}
											onPress={() => handleSelectAnswer(question.id, option)}
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
				{nextEnabled && (
					<View style={styles.nextButtonContainer}>
						<CustomButton
							title="Neste"
							onPress={() => console.log("Next")}
							style={
								nextEnabled
									? styles.nextButtonActive
									: styles.nextButtonInactive
							}
						/>
					</View>
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
	nextButtonContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	nextButton: {
		backgroundColor: "#4CAF50",
		padding: 15,
		borderRadius: 25,
	},
	// Add styles for modal title and subtitle as needed
	modalTitle: {
		fontWeight: "bold",
		fontSize: 18,
		textAlign: "center",
	},
	modalSubtitle: {
		fontSize: 16,
		textAlign: "center",
		color: "grey",
	},
});

export default FocusScreen;
