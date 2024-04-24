// import React, { useState } from "react";
// import { View, Text, Button, TextInput, Slider } from "react-native";

// const SurveyForm = ({ survey, onClose, completionTime }) => {
// 	const [answers, setAnswers] = useState({});

// 	const handleAnswerChange = (questionId, answerValue) => {
// 		setAnswers({
// 			...answers,
// 			[questionId]: answerValue,
// 		});
// 	};

// 	const submitSurvey = () => {
// 		console.log("Submitting answers:", answers); // Logg svarene, erstatt dette med API-kall om nødvendig
// 		onClose(); // Lukk skjemaet etter innsending
// 	};

// 	return (
// 		<View style={{ padding: 20 }}>
// 			<Text style={{ fontSize: 20, marginBottom: 20 }}>Survey Questions</Text>
// 			{survey.questions.map((question) => (
// 				<View key={question.id} style={{ marginBottom: 20 }}>
// 					<Text style={{ fontSize: 16, marginBottom: 10 }}>
// 						{question.question}
// 					</Text>
// 					{question.type === "singleChoice" ? (
// 						question.options.map((option, index) => (
// 							<Button
// 								key={index}
// 								title={option}
// 								onPress={() => handleAnswerChange(question.id, option)}
// 							/>
// 						))
// 					) : (
// 						<Slider
// 							step={1}
// 							minimumValue={question.sliderMin}
// 							maximumValue={question.sliderMax}
// 							onValueChange={(value) => handleAnswerChange(question.id, value)}
// 							value={answers[question.id] || question.minValue}
// 						/>
// 					)}
// 				</View>
// 			))}
// 			<Button title="Submit Survey" onPress={submitSurvey} />
// 			<Button title="Close" onPress={onClose} />
// 		</View>
// 	);
// };

// export default SurveyForm;
