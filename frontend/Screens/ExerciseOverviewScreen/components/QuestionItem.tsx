import React from "react";
import { View, Text, TextInput } from "react-native";
import CustomSlider from "../../../Components/CustomSlider/CustomSlider";
import {
	SurveyQuestion,
	Answer,
} from "../../../Context/SurveyContext/SurveyContext";
import { styles } from "../ExerciseOverviewScreen_Style";

interface QuestionItemProps {
	question: SurveyQuestion;
	onAnswer: (questionId: string, answer: string | number) => void;
	answer: Answer;
}

const QuestionItem = ({ question, onAnswer, answer }: QuestionItemProps) => {
	const handleAnswerChange = (value: string | number) => {
		onAnswer(question.id, value);
	};

	return (
		<View style={styles.questionContainer}>
			<Text style={styles.questionTitle}>{question.question}</Text>
			{question.type === "slider" && (
				<CustomSlider
					value={Number(answer.answer) || question.minValue}
					onValueChange={handleAnswerChange}
					maximumValue={question.maxValue}
					minimumValue={question.minValue}
					step={1}
				/>
			)}
			{question.type === "numericInput" && (
				<View style={styles.timeInputContainer}>
					<Text style={styles.timeInputLabel} />
					<TextInput
						style={styles.textInput}
						value={String(answer.answer)}
						onChangeText={(value) => handleAnswerChange(value)}
						keyboardType="numeric"
					/>
				</View>
			)}
		</View>
	);
};

export default QuestionItem;
