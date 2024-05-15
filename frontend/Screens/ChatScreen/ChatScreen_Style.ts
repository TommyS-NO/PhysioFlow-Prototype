import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	messagesContainer: {
		flex: 1,
		padding: 10,
		marginBottom: 10,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	input: {
		flex: 1,
		height: 50,
		backgroundColor: "white",
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 18,
		marginRight: 10,
		paddingLeft: 10,
		fontSize: 18,
	},
	sendButton: {
		padding: 10,
		backgroundColor: theme.colors.primaryButton,
		borderRadius: 12,
	},
	userMessage: {
		alignSelf: "flex-end",
		margin: 5,
		padding: 15,
		backgroundColor: theme.colors.primaryButton,
		borderRadius: 20,
		borderColor: "gray",
		borderWidth: 0.2,
	},
	userMessageText: {
		color: theme.colors.buttonText,
		fontSize: 18,
	},
	aiMessage: {
		alignSelf: "flex-start",
		margin: 5,
		padding: 15,
		backgroundColor: "white",
		borderRadius: 20,
		borderColor: "gray",
		borderWidth: 0.2,
	},
	aiMessageText: {
		fontSize: 18,
	},
});
