import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface AgePickerProps {
	selectedAge: number;
	onAgeChange: (age: number) => void;
}

export const AgePicker: React.FC<AgePickerProps> = ({
	selectedAge,
	onAgeChange,
}) => {
	const ages = Array.from({ length: 100 }, (_, i) => i + 1); // 1 til 100 år

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Hvor gammel er du?</Text>
			<Picker
				selectedValue={selectedAge}
				onValueChange={(itemValue) => onAgeChange(itemValue)}
				style={styles.picker}
				itemStyle={styles.pickerItem}
			>
				{ages.map((age) => (
					<Picker.Item key={age} label={`${age} år`} value={age} />
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

export default AgePicker;
