import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Modal,
	Button,
} from "react-native";

interface NumberSpinnerProps {
	data: number[];
	selectedValue: number;
	onValueChange: (value: number) => void;
	unit: string;
}

const NumberSpinner: React.FC<NumberSpinnerProps> = ({
	data,
	selectedValue,
	onValueChange,
	unit,
}) => {
	const [modalVisible, setModalVisible] = useState(false);

	const renderItem = ({ item }: { item: number }) => (
		<TouchableOpacity
			style={styles.item}
			onPress={() => {
				onValueChange(item);
				setModalVisible(false);
			}}
		>
			<Text style={styles.itemText}>{`${item} ${unit}`}</Text>
		</TouchableOpacity>
	);

	const getItemLayout = (
		data: ArrayLike<number> | null | undefined,
		index: number,
	) => ({
		length: styles.item.height,
		offset: styles.item.height * index,
		index,
	});
	{
		/*HEr er det forsatt bug.. Jeg bruker ikke mer tid på dette nå, dette har vi tid til å fikse underveis. (Feil med Scrollview hjulet, endre view/fjerne knapp*/
	}

	return (
		<View>
			<Button title="Velg verdi" onPress={() => setModalVisible(true)} />
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item) => item.toString()}
							showsVerticalScrollIndicator={false}
							initialScrollIndex={data.indexOf(selectedValue)}
							getItemLayout={getItemLayout}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
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
});

export default NumberSpinner;
