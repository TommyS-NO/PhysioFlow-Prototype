import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface WeightPickerProps {
	selectedWeight: number;
	onWeightChange: (weight: number) => void;
}

export const WeightPicker: React.FC<WeightPickerProps> = ({
	selectedWeight,
	onWeightChange,
}) => {
	const weights = Array.from({ length: 136 }, (_, i) => i + 45);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Hvor mye veier du?</Text>
			<Picker
				selectedValue={selectedWeight}
				onValueChange={(itemValue) => onWeightChange(itemValue)}
				style={styles.picker}
				itemStyle={styles.pickerItem}
			>
				{weights.map((weight) => (
					<Picker.Item key={weight} label={`${weight} kg`} value={weight} />
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},
	label: {
		fontSize: 16,
		color: "#000",
		marginBottom: 8,
	},
	picker: {
		width: "100%",
		height: 200,
	},
	pickerItem: {
		fontSize: 16,
		height: 200, //iOS
	},
});

export default WeightPicker;
