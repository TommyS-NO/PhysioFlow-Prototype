// import React from "react";
// import { View, Text, Switch, TouchableOpacity } from "react-native";

// interface QuestionProps {
// 	question: string;
// 	onSelection: (question: string, selection: boolean | string) => void;
// 	selected: boolean | string | null;
// 	options?: string[];
// }

// const QuestionComponent: React.FC<QuestionProps> = ({
// 	question,
// 	onSelection,
// 	selected,
// 	options,
// }) => {
// 	if (options) {
// 		// Hvis det er flere valgspørsmål
// 		return (
// 			<View>
// 				<Text>{question}</Text>
// 				{options.map((option) => (
// 					<TouchableOpacity
// 						key={option}
// 						onPress={() => onSelection(question, option)}
// 					>
// 						<Text
// 							style={{
// 								color: selected === option ? "blue" : "black",
// 							}}
// 						>
// 							{option}
// 						</Text>
// 					</TouchableOpacity>
// 				))}
// 			</View>
// 		);
// 	}
// 	// Hvis det er ja/nei-spørsmål
// 	return (
// 		<View>
// 			<Text>{question}</Text>
// 			<Switch
// 				value={selected === true}
// 				onValueChange={(value) => onSelection(question, value)}
// 			/>
// 		</View>
// 	);
// };

// export default QuestionComponent;
