import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface CustomSliderProps {
	value: number;
	onValueChange: (value: number) => void;
	minimumValue?: number;
	maximumValue?: number;
	step?: number;
	title: string;
	trackColor?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
	value,
	onValueChange,
	minimumValue = 1,
	maximumValue = 10,
	step = 1,
	title,
	trackColor = "#ddd",
}) => {
	const getColor = (value: number): string => {
		const red = 255 - (value * 255) / 10;
		const green = (value * 255) / 10;
		return `rgb(${red},${green},0)`;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Slider
				style={styles.slider}
				value={value}
				onValueChange={onValueChange}
				minimumValue={minimumValue}
				maximumValue={maximumValue}
				step={step}
				minimumTrackTintColor={trackColor} // Bruk trackColor for spor-farge
				maximumTrackTintColor="#00000000" // Transparent
				thumbTintColor={getColor(value)}
				// Tsilgjengelighetslabel for bedre UX for skjermleserbrukere
				accessibilityLabel={`${title} slider`}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "stretch",
		justifyContent: "center",
		marginVertical: 10,
	},
	slider: {
		width: "100%",
		height: 40,
	},
	title: {
		fontSize: 16,
		color: "black",
		marginBottom: 4,
	},
});

export default CustomSlider;
