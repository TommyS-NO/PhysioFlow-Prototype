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
import NumberSpinner from "./NumberSpinner";

interface PickerComponentProps {
	mode: "date" | "picker";
	selectedValue: Date | number;
	onValueChange: (value: Date | number) => void;
	label: string;
	values?: number[];
	unit?: string;
}
export const PickerComponent: React.FC<PickerComponentProps> = ({
	mode,
	selectedValue,
	onValueChange,
	label,
	values,
	unit = "",
}) => {
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [pickerString, setPickerString] = useState<string>("");

	useEffect(() => {
		if (mode === "date" && selectedValue instanceof Date) {
			setPickerString(selectedValue.toLocaleDateString());
		} else if (
			mode === "picker" &&
			typeof selectedValue === "number" &&
			values
		) {
			setPickerString(`${selectedValue} ${unit}`);
		}
	}, [selectedValue, values, unit, mode]);

	const togglePicker = () => setShowPicker(!showPicker);

	const handleDateChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date,
	) => {
		if (selectedDate) {
			onValueChange(selectedDate);
			setShowPicker(Platform.OS === "ios"); // Keep picker open on iOS
		}
	};

	const renderPickerSelection = () => (
		<TouchableOpacity onPress={togglePicker} style={styles.selectionContainer}>
			<Text style={styles.valueText}>
				{pickerString || `Velg ${label.toLowerCase()}`}
			</Text>
		</TouchableOpacity>
	);
	{
		/*BUG BUG åpner seg 2 ganger selv om ok/cancel//DateTimePicker-Android */
	}
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			{mode === "date" ? (
				<>
					{renderPickerSelection()}
					{showPicker && (
						<DateTimePicker
							value={selectedValue instanceof Date ? selectedValue : new Date()}
							mode="date"
							display={Platform.OS === "android" ? "spinner" : "default"}
							onChange={handleDateChange}
							maximumDate={new Date()} // ikke fremtidige datoer
						/>
					)}
				</>
			) : (
				<>
					{renderPickerSelection()}
					{showPicker && values && (
						<NumberSpinner
							data={values}
							selectedValue={
								typeof selectedValue === "number" ? selectedValue : values[0]
							}
							onValueChange={(value: number) => onValueChange(value)}
							unit={unit}
						/>
					)}
				</>
			)}
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
	picker: {
		width: "100%",
		height: 150,
	},
});
