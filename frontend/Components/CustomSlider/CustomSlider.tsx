import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

interface CustomSliderProps {
	value: number;
	onValueChange: (value: number) => void;
	title: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
	value,
	onValueChange,
	title,
}) => {
	const getColor = (value: number): string => {
		const ratio = value / 10;
		const red = Math.floor(255 * ratio);
		const green = Math.floor(255 * (1 - ratio));
		return `rgb(${red},${green},0)`;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.sliderBackground}>
				<Slider
					style={styles.slider}
					value={value}
					onValueChange={onValueChange}
					minimumValue={1}
					maximumValue={10}
					step={1}
					minimumTrackTintColor={getColor(value)}
					maximumTrackTintColor="#000000"
					thumbTintColor={getColor(value)}
				/>
			</View>
		</View>
	);
};

const fullWidth = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
	container: {
		alignItems: "stretch",
		justifyContent: "center",
		marginVertical: 10,
	},
	sliderBackground: {
		height: 30,
		width: fullWidth,
		borderRadius: 15,
		backgroundColor: "#ddd",
		justifyContent: "center",
	},
	slider: {
		width: fullWidth,
		height: 40,
		position: "absolute",
	},
	title: {
		fontSize: 16,
		color: "black",
		marginBottom: 4,
	},
});

export default CustomSlider;
