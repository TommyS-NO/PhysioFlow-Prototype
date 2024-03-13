import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomModal from "../CustomModal/CustomModal";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import CustomButton from "../CustomButton/CustomButton";

interface FocusSelectionProps {
	visible: boolean;
	onClose: () => void;
	onUpdate: (area: string, value: string) => void;
	area: string;
	initialSelection: string;
}

const options = [
	"Ny plage",
	"Tidligere plage",
	"Under rehabilitering",
	"Annet",
];

const FocusSelection: React.FC<FocusSelectionProps> = ({
	visible,
	onClose,
	onUpdate,
	area,
	initialSelection,
}) => {
	const [selectedOption, setSelectedOption] =
		useState<string>(initialSelection);

	const handleCheckBoxChange = (option: string) => {
		setSelectedOption(selectedOption === option ? "" : option);
	};

	const handleModalClose = () => {
		// Om brukeren ikke har gjort et valg, lukkes modalen uten advarsler.
		onClose();
	};

	const handleUpdate = () => {
		// Brukeren må ha gjort et valg for at onUpdate skal kalles.
		if (selectedOption) {
			onUpdate(area, selectedOption);
		}
		onClose();
	};

	const renderCheckBoxes = () => {
		return options.map((option) => (
			<CustomCheckBox
				key={option}
				title={option}
				checked={selectedOption === option}
				onPress={() => handleCheckBoxChange(option)}
			/>
		));
	};

	return (
		<CustomModal
			visible={visible}
			onClose={handleModalClose}
			title={`Velg alternativ for ${area}`}
		>
			<View style={styles.checkBoxContainer}>{renderCheckBoxes()}</View>
			<CustomButton
				title="Bekreft"
				onPress={handleUpdate}
				disabled={!selectedOption}
			/>
		</CustomModal>
	);
};

const styles = StyleSheet.create({
	checkBoxContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 10,
	},
});

export default FocusSelection;
