import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface HeightPickerProps {
	selectedHeight: number;
	onHeightChange: (height: number) => void;
}

export const HeightPicker: React.FC<HeightPickerProps> = ({
	selectedHeight,
	onHeightChange,
}) => {
	const heights = Array.from({ length: 81 }, (_, i) => i + 130);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Hvor høy er du?</Text>
			<Picker
				selectedValue={selectedHeight}
				onValueChange={(itemValue) => onHeightChange(itemValue)}
				style={styles.picker}
				itemStyle={styles.pickerItem}
			>
				{heights.map((height) => (
					<Picker.Item key={height} label={`${height} cm`} value={height} />
				))}
			</Picker>
		</View>
	);
};
{
	/*VI Må finne ut av hvordan vi skal få denne lik på iOs og Android. 3part biblotek?*/
}

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
		height: 200,
	},
});

export default HeightPicker;
