import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
} from "react-native";
import CustomModal from "../../../Components/CustomModal/CustomModal";

interface NumberSpinnerProps {
	data: number[];
	selectedValue: number;
	onValueChange: (value: number) => void;
	unit: string;
	label: string;
}

const NumberSpinner: React.FC<NumberSpinnerProps> = ({
	data,
	selectedValue,
	onValueChange,
	unit,
	label,
}) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleValueChange = (value: number) => {
		onValueChange(value);
		setModalVisible(false);
	};

	const renderItem = ({ item }: { item: number }) => (
		<TouchableOpacity
			style={[styles.item, item === selectedValue && styles.selectedItem]}
			onPress={() => handleValueChange(item)}
		>
			<Text style={styles.itemText}>{`${item} ${unit}`}</Text>
		</TouchableOpacity>
	);

	return (
		<View>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Text style={styles.selectedValueText}>
					{selectedValue
						? `${label}: ${selectedValue} ${unit}`
						: `Klikk her for å velge ${label}`}
				</Text>
			</TouchableOpacity>
			<CustomModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				title={`Velg ${label}`}
			>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.toString()}
					showsVerticalScrollIndicator={false}
					extraData={selectedValue}
				/>
			</CustomModal>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
	},
	subtitle: {
		fontSize: 14,
		textAlign: "center",
		marginBottom: 10,
	},
	item: {
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
	itemText: {
		fontSize: 24,
	},
	selectedItem: {
		backgroundColor: "#e7e7e7",
	},
	selectedValueText: {
		fontSize: 18,
		color: "black",
		marginTop: 10,
		textAlign: "center",
	},
});

export default NumberSpinner;
