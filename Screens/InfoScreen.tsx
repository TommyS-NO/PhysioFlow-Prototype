import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const InfoScreen: React.FC = () => {
	const navigation = useNavigation();

	const handleStartExtraInfo = () => {
		Alert.alert("Neste side er under utvikling");
	};

	return (
		<ImageBackground
			source={require("../Assets/mountain.jpg")}
			style={styles.container}
		>
			<View style={styles.topContainer}>
				{/* <Image
					source={require("../Assets/logoReact.png")}
					style={styles.logo}
				/> */}
				<Text style={styles.title}>Flott!</Text>
				<Image
					source={require("../Assets/Robot_3.png")}
					style={styles.avatarImage}
				/>
				<Text style={styles.description}>
					Nå trenger vi å vite litt mer om deg for å gi deg best mulig utbytte
					av denne tjenesten. Nå kommer det noen spørsmål vi ønsker at du
					besvarer så korrekt som mulig. Du kan alltid gjøre endringer på dette
					senere.
				</Text>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleStartExtraInfo}>
				<Text style={styles.buttonText}>Kom i gang!</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	topContainer: {
		marginTop: theme.spacing.large,
		alignItems: "center",
	},
	logo: {
		height: 100,
		width: 100,
		resizeMode: "contain",
	},
	title: {
		fontSize: theme.fontSize.title,
		fontWeight: "bold",
		color: theme.colors.text,
		marginVertical: theme.spacing.small,
	},
	description: {
		fontSize: theme.fontSize.regular,
		color: theme.colors.text,
		textAlign: "center",
		marginVertical: theme.spacing.medium,
	},
	avatarImage: {
		height: 200,
		width: 200,
		marginVertical: theme.spacing.medium,
	},
	button: {
		backgroundColor: theme.colors.button,
		paddingVertical: theme.spacing.medium,
		paddingHorizontal: theme.spacing.large,
		borderRadius: theme.borderRadius.medium,
		marginBottom: theme.spacing.large,
	},
	buttonText: {
		color: theme.colors.text,
		fontSize: theme.fontSize.title,
	},
});

export default InfoScreen;
