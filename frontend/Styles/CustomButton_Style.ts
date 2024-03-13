import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const customButtonStyles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: theme.spacing.small,
		paddingHorizontal: theme.spacing.medium,
		borderRadius: theme.borderRadius.small,
		backgroundColor: theme.colors.button,
		width: 150,
		margin: theme.spacing.small,
	},
	title: {
		fontSize: theme.fontSize.regular,
		color: theme.colors.text,
	},
	icon: {
		marginRight: theme.spacing.small,
	},
	disabled: {
		backgroundColor: theme.colors.disabled,
	},
	disabledTitle: {
		color: theme.colors.disabledText,
	},
});
