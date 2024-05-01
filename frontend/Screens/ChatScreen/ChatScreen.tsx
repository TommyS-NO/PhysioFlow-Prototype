import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { useUser } from "../../Context/UserContext";
import { apiService } from "../../Services/ApiService";

interface Message {
	text: string;
	sender: "user" | "ai";
}

const ChatScreen = () => {
	const { state } = useUser();
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [sessionId, setSessionId] = useState<string | null>(null);

	useEffect(() => {
		const startChat = async () => {
			try {
				const chatSession = await apiService.startAIChat(state.userId);
				setSessionId(chatSession.session.sessionId);
				console.log("AI chat session started:", chatSession);
				// Send initial greeting from AI
				const initialGreeting =
					"Hei, Jeg heter BobAi, hvordan kan jeg hjelpe deg?";
				setMessages([{ text: initialGreeting, sender: "ai" }]);
			} catch (error) {
				console.error("Failed to start AI chat:", error);
			}
		};

		if (state.userId) {
			startChat();
		}
	}, [state.userId]);

	const sendMessage = async () => {
		if (input.trim() === "" || !sessionId) return;

		setMessages((currentMessages) => [
			...currentMessages,
			{ text: input, sender: "user" },
		]);

		try {
			const chatResponse = await apiService.sendMessageToAIChat(
				sessionId,
				input,
			);
			if (chatResponse?.aiResponse) {
				setMessages((currentMessages) => [
					...currentMessages,
					{ text: chatResponse.aiResponse, sender: "ai" },
				]);
			}
		} catch (error) {
			console.error("Failed to send message:", error);
		}

		setInput("");
	};

	const renderMessage = (msg) => {
		const textStyle =
			msg.sender === "user" ? styles.userMessage : styles.aiMessage;
		// Split the message to apply bold to "BobAi"
		const parts = msg.text.split(": ");
		if (msg.sender === "ai" && parts.length > 1) {
			return (
				<Text key={msg.text} style={textStyle}>
					<Text style={styles.bold}>{parts[0]}</Text>
					{": " + parts[1]}
				</Text>
			);
		}
		return (
			<Text key={msg.text} style={textStyle}>
				{msg.text}
			</Text>
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.messagesContainer}>
				{messages.map((msg, index) => renderMessage(msg))}
			</ScrollView>
			<TextInput
				style={styles.input}
				value={input}
				onChangeText={setInput}
				placeholder="Still et spørsmål..."
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
	bold: {
		fontWeight: "bold",
	},
	messagesContainer: {
		flex: 1,
		padding: 10,
		backgroundColor: "#f5f5f5",
		borderRadius: 5,
		marginBottom: 10,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
	},
	userMessage: {
		alignSelf: "flex-end",
		margin: 5,
		padding: 10,
		backgroundColor: "#0084ff",
		color: "#fff",
		borderRadius: 5,
	},
	aiMessage: {
		alignSelf: "flex-start",
		margin: 5,
		padding: 10,
		backgroundColor: "#e5e5ea",
		borderRadius: 5,
	},
});

export default ChatScreen;
