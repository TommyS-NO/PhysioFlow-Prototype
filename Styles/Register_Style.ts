import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const registerScreenStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	scrollContentContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	// Legg til flere stiler etter behov
});
