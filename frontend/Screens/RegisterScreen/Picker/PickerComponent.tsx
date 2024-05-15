import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface PickerComponentProps {
	mode: "date" | "picker";
	selectedValue: Date | number;
	onValueChange: (value: Date | number) => void;
	label: string;
}

const PickerComponent: React.FC<PickerComponentProps> = ({
	mode,
	selectedValue,
	onValueChange,
	label,
}) => {
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [pickerString, setPickerString] = useState<string>("");

	useEffect(() => {
		if (mode === "date" && selectedValue instanceof Date) {
			const dateString = selectedValue.toLocaleDateString();
			setPickerString(dateString);
		}
	}, [selectedValue, mode]);

	const togglePicker = () => setShowPicker(!showPicker);
	const handleDateChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date,
	) => {
		if (event.type === "set") {
			if (selectedDate) {
				onValueChange(selectedDate);
			}
		}
		setShowPicker(false);
	};

	const renderPickerSelection = () => (
		<TouchableOpacity onPress={togglePicker} style={styles.selectionContainer}>
			<Text style={styles.valueText}>
				{pickerString || `Velg ${label.toLowerCase()}`}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			{mode === "date" ? (
				<>
					{renderPickerSelection()}
					{showPicker && (
						<DateTimePicker
							value={
								new Date(new Date().setFullYear(new Date().getFullYear() - 50))
							}
							mode="date"
							display={Platform.OS === "android" ? "spinner" : "default"}
							onChange={handleDateChange}
							minimumDate={
								new Date(new Date().setFullYear(new Date().getFullYear() - 90))
							}
							maximumDate={
								new Date(new Date().setFullYear(new Date().getFullYear() - 13))
							}
						/>
					)}
				</>
			) : null}
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
		fontSize: 18,
		color: "#26807C",
		marginBottom: 10,
	},
	valueText: {
		fontSize: 16,
		color: "#000",
		padding: 8,
		marginTop: 4,
		marginBottom: 4,
		borderColor: "#000",
		borderWidth: 1,
		borderRadius: 4,
		textAlign: "center",
		minWidth: 120,
	},
	selectionContainer: {
		marginBottom: 10,
	},
});

export default PickerComponent;
