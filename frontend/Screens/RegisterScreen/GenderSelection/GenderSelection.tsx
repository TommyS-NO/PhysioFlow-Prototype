import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../../theme";

interface GenderSelectionProps {
	selectedGender: "male" | "female" | "unspecified" | undefined;
	onSelectGender: (gender: "male" | "female" | "unspecified") => void;
}

const GenderSelection = ({
	selectedGender,
	onSelectGender,
}: GenderSelectionProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Velg kjønn</Text>
			<View style={styles.genderOptionsContainer}>
				<TouchableOpacity
					style={[
						styles.option,
						selectedGender === "male" ? styles.selected : null,
					]}
					onPress={() => onSelectGender("male")}
				>
					<Image
						source={require("../../../Assets/Mann.png")}
						style={styles.image}
					/>
					<Text>Mann</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.option,
						selectedGender === "female" ? styles.selected : null,
					]}
					onPress={() => onSelectGender("female")}
				>
					<Image
						source={require("../../../Assets/Dame.png")}
						style={styles.image}
					/>
					<Text>Kvinne</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[
					styles.option,
					selectedGender === "unspecified" ? styles.selected : null,
				]}
				onPress={() => onSelectGender("unspecified")}
			>
				<Text>Ønsker ikke å oppgi</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
	},
	genderOptionsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly", 
		width: "100%",
	},
	option: {
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderWidth: 1,
		borderColor: "#D3D3D3",
		borderRadius: 10,
		marginBottom: 20,
		backgroundColor: "FFFFFF",
		marginHorizontal: 30, 
	},
	selected: {
		borderColor: "#26807C",
		borderWidth: 2,
	},
	image: {
		width: 120,
		height: 200,
		marginBottom: 10,
		resizeMode: "contain",
	},
});

export default GenderSelection;
