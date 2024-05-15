import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface GenderSelectionProps {
	selectedGender: "male" | "female" | "unspecified" | undefined;
	onSelectGender: (gender: "male" | "female" | "unspecified") => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({
	selectedGender,
	onSelectGender,
}) => {
	const [imageError, setImageError] = useState({ male: false, female: false });

	return (
		<View style={styles.container}>
			<Text style={styles.infoTitle}>Velg kjønn:</Text>
			<View style={styles.genderOptionsContainer}>
				<TouchableOpacity
					style={[styles.option, selectedGender === "male" && styles.selected]}
					onPress={() => onSelectGender("male")}
				>
					{imageError.male ? (
						<Text>Bildet kunne ikke lastes</Text>
					) : (
						<Image
							source={require("../../../Assets/Mann.png")}
							style={styles.genderImage}
							onError={() => setImageError({ ...imageError, male: true })}
						/>
					)}
					<Text>Mann</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.option,
						selectedGender === "female" && styles.selected,
					]}
					onPress={() => onSelectGender("female")}
				>
					{imageError.female ? (
						<Text>Bildet kunne ikke lastes</Text>
					) : (
						<Image
							source={require("../../../Assets/Dame.png")}
							style={styles.genderImage}
							onError={() => setImageError({ ...imageError, female: true })}
						/>
					)}
					<Text>Kvinne</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[
					styles.option,
					selectedGender === "unspecified" && styles.selected,
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
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	infoTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
	genderOptionsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
		alignItems: "center",
	},
	option: {
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		borderWidth: 1,
		borderColor: "#D3D3D3",
		borderRadius: 10,
		marginBottom: 20,
		backgroundColor: "white",
		marginHorizontal: 3,
		flex: 1,
	},
	selected: {
		borderColor: "#26807C",
		borderWidth: 2,
	},
	genderImage: {
		width: 160,
		height: 190,
		marginBottom: 10,
		resizeMode: "contain",
	},
});

export default GenderSelection;
