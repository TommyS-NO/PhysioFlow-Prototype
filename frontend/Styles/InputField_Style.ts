import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const inputFieldStyles = StyleSheet.create({
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		width: "80%",
		paddingVertical: theme.spacing.small,
		paddingHorizontal: theme.spacing.medium,
		borderRadius: theme.borderRadius.medium,
		fontSize: theme.fontSize.regular,
		marginVertical: theme.spacing.small,
		color: theme.colors.text,
		borderColor: theme.colors.primary,
		borderWidth: 1,
		height: 50,
	},
});
