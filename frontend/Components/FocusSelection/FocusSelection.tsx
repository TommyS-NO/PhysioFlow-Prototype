import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomModal from "../CustomModal/CustomModal";
import CustomButton from "../CustomButton/CustomButton";
import { FocusAreaKey, Answer, useFocusArea } from "../../Context/FocusContext";

interface FocusSelectionProps {
	visible: boolean;
	onClose: () => void;
	onUpdate: (answers: Answer[]) => void;
	area: FocusAreaKey;
}

const questions = [
	"Er dette første gang du opplever denne typen smerte eller ubehag?",
	"Har du tidligere hatt en skade i samme område som du nå opplever smerte eller ubehag?",
	"Oppstod smerten/ubehaget plutselig uten en åpenbar årsak?",
	"Har du endret ditt fysiske aktivitetsnivå eller startet en ny type trening nylig?",
	"Føler du at daglige aktiviteter eller spesifikke bevegelser utløser eller forverrer smerten/ubehaget?",
];

interface YesNoQuestionProps {
	question: string;
	onSelection: (question: string, selection: boolean) => void;
	selected: boolean | null;
}

const YesNoQuestion: React.FC<YesNoQuestionProps> = ({
	question,
	onSelection,
	selected,
}) => {
	return (
		<View style={styles.questionContainer}>
			<Text style={styles.questionText}>{question}</Text>
			<View style={styles.answerContainer}>
				<TouchableOpacity
					style={[
						styles.answerButton,
						selected === true ? styles.selectedYes : undefined,
					]}
					onPress={() => onSelection(question, true)}
				>
					<Text style={styles.answerText}>Ja</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.answerButton,
						selected === false ? styles.selectedNo : undefined,
					]}
					onPress={() => onSelection(question, false)}
				>
					<Text style={styles.answerText}>Nei</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const FocusSelection: React.FC<FocusSelectionProps> = ({
	visible,
	onClose,
	onUpdate,
	area,
}) => {
	const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
	const { dispatch } = useFocusArea();

	const handleSelection = (question: string, selection: boolean) => {
		setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: selection }));
	};

	const handleUpdate = () => {
		const answersArray: Answer[] = Object.entries(answers).map(
			([question, answer]) => ({
				question,
				answer: answer as boolean, // Type assertion her for å sikre at answer ikke er null
			}),
		);

		if (answersArray.length === questions.length) {
			dispatch({
				type: "SET_ANSWERS",
				area: area,
				answers: answersArray,
			});
			onUpdate(answersArray);
			onClose();
		} else {
			// Gi beskjed til brukeren at alle spørsmålene må besvares
			Alert.alert(
				"Viktig",
				"Vennligst svar på alle spørsmålene før du fortsetter.",
			);
		}
	};

	// Sjekker om alle spørsmål er besvart
	const allQuestionsAnswered =
		Object.values(answers).filter((val) => val !== null).length ===
		questions.length;

	return (
		<CustomModal
			visible={visible}
			onClose={onClose}
			title={`Svar på spørsmålene - ${area}`}
		>
			<View style={styles.container}>
				{questions.map((question) => (
					<YesNoQuestion
						key={question}
						question={question}
						onSelection={handleSelection}
						selected={answers[question]}
					/>
				))}
				<CustomButton
					title="Bekreft"
					onPress={handleUpdate}
					disabled={!allQuestionsAnswered}
				/>
			</View>
		</CustomModal>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 10,
	},
	questionContainer: {
		width: "100%",
		marginBottom: 10,
	},
	questionText: {
		textAlign: "center",
		marginBottom: 5,
	},
	answerContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	answerButton: {
		padding: 10,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	selectedYes: {
		backgroundColor: "lightgreen",
	},
	selectedNo: {
		backgroundColor: "salmon",
	},
	answerText: {
		textAlign: "center",
	},
});

export default FocusSelection;
