// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import CustomSlider from "../CustomSlider/CustomSlider";

interface FollowUpQuestProps {
	onContinue: (rehabTime: number, intensityLevel: number) => void;
}

const FollowUpQuestion: React.FC<FollowUpQuestProps> = ({ onContinue }) => {
	const [rehabTime, setRehabTime] = useState(0);
	const [intensityLevel, setIntensityLevel] = useState(0);

	return (
		<View style={styles.container}>
			<Text style={styles.question}>
				Hvor mange uker har du opplevd smerte?
			</Text>
			<CustomSlider
				title="Rehabiliteringstid (uker)"
				value={rehabTime}
				onValueChange={setRehabTime}
				minimumValue={1}
				maximumValue={52}
				step={1}
			/>
			<Text style={styles.question}>
				Hvor intens er smerten på en skala fra 1 til 10?
			</Text>
			<CustomSlider
				title="Smerteintensitet"
				value={intensityLevel}
				onValueChange={setIntensityLevel}
				minimumValue={1}
				maximumValue={10}
				step={1}
			/>
			<CustomButton
				title="Fortsett"
				onPress={() => onContinue(rehabTime, intensityLevel)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	question: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20,
	},
	// Legg til flere stiler etter behov
});

export default FollowUpQuestion;
