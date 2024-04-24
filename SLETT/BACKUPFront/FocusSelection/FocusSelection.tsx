// import React, { useEffect, useState } from "react";
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	TouchableOpacity,
// 	Alert,
// 	ActivityIndicator,
// } from "react-native";
// import CustomModal from "../CustomModal/CustomModal";
// import CustomButton from "../CustomButton/CustomButton";
// import { useFocusArea } from "../../Context/FocusContext";
// import { questionService } from "../../Services/questionService";

// type Question = {
// 	id: string;
// 	text: string;
// 	options: string[];
// };

// interface FocusSelectionProps {
// 	visible: boolean;
// 	onClose: () => void;
// 	onUpdate: (selections: Record<string, boolean>) => void;
// 	area: string;
// }

// const FocusSelection = (props: FocusSelectionProps) => {
// 	const { visible, onClose, onUpdate, area } = props;
// 	const [questions, setQuestions] = useState<Question[]>([]);
// 	const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const { dispatch } = useFocusArea();

// 	useEffect(() => {
// 		const fetchQuestions = async () => {
// 			setIsLoading(true);
// 			try {
// 				const fetchedQuestions =
// 					await questionService.getQuestionsByFocusArea(area);
// 				setQuestions(fetchedQuestions);
// 				setAnswers(
// 					fetchedQuestions.reduce(
// 						(acc, question) => ({ ...acc, [question.id]: null }),
// 						{},
// 					),
// 				);
// 			} catch (error) {
// 				Alert.alert("Feil", "Kunne ikke hente spørsmål.");
// 				console.error(error);
// 			}
// 			setIsLoading(false);
// 		};
// 		if (area) {
// 			fetchQuestions();
// 		}
// 	}, [area]);

// 	const handleSelection = (questionId: string, selection: boolean) => {
// 		setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selection }));
// 	};

// 	const handleUpdate = () => {
// 		if (Object.values(answers).every((val) => val !== null)) {
// 			dispatch({
// 				type: "SET_ANSWERS",
// 				area,
// 				answers: Object.entries(answers).map(([questionId, answer]) => ({
// 					question: questionId,
// 					answer: answer as boolean,
// 				})),
// 			});
// 			onUpdate(answers as Record<string, boolean>);
// 			onClose();
// 		} else {
// 			Alert.alert(
// 				"Viktig",
// 				"Vennligst svar på alle spørsmålene før du fortsetter.",
// 			);
// 		}
// 	};

// 	const allQuestionsAnswered =
// 		questions.length > 0 && Object.values(answers).every((val) => val !== null);

// 	if (isLoading) {
// 		return <ActivityIndicator size="large" color="#0000ff" />;
// 	}

// 	return (
// 		<CustomModal
// 			visible={visible}
// 			onClose={onClose}
// 			title={`Svar på spørsmålene - ${area}`}
// 		>
// 			<View style={styles.container}>
// 				{questions.map((question) => (
// 					<View key={question.id} style={styles.questionContainer}>
// 						<Text style={styles.questionText}>{question.text}</Text>
// 						<View style={styles.answerContainer}>
// 							{question.options.map((option) => (
// 								<TouchableOpacity
// 									key={option}
// 									style={[
// 										styles.answerButton,
// 										answers[question.id] === (option === "Ja")
// 											? styles.selectedYes
// 											: undefined,
// 										answers[question.id] === (option !== "Ja")
// 											? styles.selectedNo
// 											: undefined,
// 									]}
// 									onPress={() => handleSelection(question.id, option === "Ja")}
// 								>
// 									<Text style={styles.answerText}>{option}</Text>
// 								</TouchableOpacity>
// 							))}
// 						</View>
// 					</View>
// 				))}
// 				<CustomButton
// 					title="Bekreft"
// 					onPress={handleUpdate}
// 					disabled={!allQuestionsAnswered}
// 				/>
// 			</View>
// 		</CustomModal>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		width: "100%",
// 		flexDirection: "column",
// 		alignItems: "center",
// 		marginBottom: 10,
// 	},
// 	questionContainer: {
// 		width: "100%",
// 		marginBottom: 10,
// 	},
// 	questionText: {
// 		textAlign: "center",
// 		marginBottom: 5,
// 	},
// 	answerContainer: {
// 		flexDirection: "row",
// 		justifyContent: "space-around",
// 	},
// 	answerButton: {
// 		padding: 10,
// 		borderWidth: 1,
// 		borderColor: "#ddd",
// 	},
// 	selectedYes: {
// 		backgroundColor: "lightgreen",
// 	},
// 	selectedNo: {
// 		backgroundColor: "salmon",
// 	},
// 	answerText: {
// 		textAlign: "center",
// 	},
// });

// export default FocusSelection;
