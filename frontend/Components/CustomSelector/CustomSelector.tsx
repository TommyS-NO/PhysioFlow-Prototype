import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";

interface CustomSelectorProps {
	options: string[];
	selectedOption: string;
	onSelect: (option: string) => void;
	label: string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
	options,
	selectedOption,
	onSelect,
	label,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<View style={styles.container}>
			<Text style={styles.label} onPress={() => setIsOpen(!isOpen)}>
				{label}:
			</Text>

			{isOpen &&
				options.map((option) => (
					<CustomCheckBox
						key={option}
						title={option}
						checked={selectedOption === option}
						onPress={() => onSelect(option)}
					/>
				))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	// Legg til stiler for CustomCheckBox hvis nødvendig
});

export default CustomSelector;
