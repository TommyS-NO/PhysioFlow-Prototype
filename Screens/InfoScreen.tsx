import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const InfoScreen: React.FC = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Flott!</Text>
			<Text style={styles.description}>
				Nå trenger vi å vite litt mer om deg for å gi deg best mulig utbytte av
				denne tjenesten. Nå kommer det noen spørsmål vi ønsker at du besvarer så
				korrekt som mulig. Du kan alltid gjøre endringer på dette senere.
			</Text>
			<View style={styles.imageContainer}>{/*legge inn bildet */}</View>
			{/* <Button title="Kom i gang!" onPress={() => navigation.navigate("")} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing.large,
		// backgroundColor: theme.colors.background,
	},
	title: {
		fontSize: theme.fontSize.title,
		fontWeight: "bold",
		color: theme.colors.text,
	},
	description: {
		fontSize: theme.fontSize.regular,
		color: theme.colors.text,
		textAlign: "center",
		marginVertical: theme.spacing.medium,
	},
	imageContainer: {},
});

export default InfoScreen;
