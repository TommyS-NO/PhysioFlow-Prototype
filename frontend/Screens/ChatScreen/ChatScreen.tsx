import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../../Context/UserContext";
import { apiService } from "../../Services/ApiService";
import FooterNavigation from "../../Navigation/FooterNavigation/FooterNavigation";
import { styles } from "./ChatScreen_Style";

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
				const initialGreeting =
					"Hei! Jeg heter BobAi, hvordan kan jeg hjelpe deg?";
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

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
		>
			<ScrollView style={styles.messagesContainer}>
				{messages.map((msg, index) => (
					<View
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						style={
							msg.sender === "user" ? styles.userMessage : styles.aiMessage
						}
					>
						<Text
							style={
								msg.sender === "user"
									? styles.userMessageText
									: styles.aiMessageText
							}
						>
							{msg.text}
						</Text>
					</View>
				))}
			</ScrollView>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={input}
					onChangeText={setInput}
					placeholder="Still et spørsmål..."
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
					<Icon name="send" size={24} color="white" />
				</TouchableOpacity>
			</View>
			<FooterNavigation />
		</KeyboardAvoidingView>
	);
};

export default ChatScreen;
