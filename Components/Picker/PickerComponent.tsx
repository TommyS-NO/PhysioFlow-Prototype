import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerComponentProps {
	selectedValue: number;
	onValueChange: (value: number) => void;
	label: string;
	values: number[];
}

export const PickerComponent: React.FC<PickerComponentProps> = ({
	selectedValue,
	onValueChange,
	label,
	values,
}) => (
	<View style={styles.container}>
		<Text style={styles.label}>{label}</Text>
		<Picker
			selectedValue={selectedValue}
			onValueChange={onValueChange}
			style={styles.picker}
			itemStyle={styles.pickerItem}
		>
			{values.map((value) => (
				<Picker.Item key={value} label={`${value}`} value={value} />
			))}
		</Picker>
	</View>
);

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
