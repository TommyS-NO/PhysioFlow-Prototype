import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const frontScreenStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	topContainer: {
		position: "absolute",
		top: 0,
		alignItems: "center",
		width: "100%",
	},
	logo: {
		height: 50,
		width: 50,
		marginTop: 50,
	},
	titleText: {
		color: theme.colors.primary,
		fontSize: theme.fontSize.h1,
		fontWeight: "bold",
		marginVertical: theme.spacing.small,
	},
	helpButton: {
		position: "absolute",
		right: theme.spacing.medium,
		top: theme.spacing.large,
		padding: theme.spacing.small,
		zIndex: 1,
	},
	loginContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: theme.spacing.medium,
		borderRadius: theme.borderRadius.medium,
		width: "80%",
		alignItems: "center",
	},
	loginText: {
		fontSize: theme.fontSize.title,
		marginBottom: theme.spacing.medium,
	},
	registerText: {
		marginTop: theme.spacing.medium,
		fontSize: theme.fontSize.regular,
	},
	// ...andre stiler som tilhører FrontScreen...
});
