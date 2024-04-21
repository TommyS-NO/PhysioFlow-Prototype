import React, { useState } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../Components/CustomButton/CustomButton";

interface Message {
	text: string;
	sender: "user" | "ai";
}

const ChatScreen = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");

	const sendMessage = async () => {
		if (input.trim() === "") return;
		const newMessages = [...messages, { text: input, sender: "user" }];
		setMessages(newMessages);

		try {
			const response = await fetch("http://localhost/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question: input }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			newMessages.push({ text: data.answer, sender: "ai" });
			setMessages(newMessages);
		} catch (error) {
			console.error("Failed to send message:", error);
			// Håndter eventuelle feil, for eksempel ved å vise en feilmelding
		}

		setInput("");
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.messagesContainer}>
				{messages.map((msg, index) => (
					<Text
						key={index}
						style={
							msg.sender === "user" ? styles.userMessage : styles.aiMessage
						}
					>
						{msg.text}
					</Text>
				))}
			</ScrollView>
			<TextInput
				style={styles.input}
				value={input}
				onChangeText={setInput}
				placeholder="Ask a question..."
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<CustomButton title="Send" onPress={sendMessage} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	messagesContainer: {
		flex: 1,
		padding: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
		marginBottom: 10,
	},
	userMessage: {
		alignSelf: "flex-end",
		margin: 5,
		padding: 10,
		backgroundColor: "lightblue",
	},
	aiMessage: {
		alignSelf: "flex-start",
		margin: 5,
		padding: 10,
		backgroundColor: "lightgray",
	},
});

export default ChatScreen;
