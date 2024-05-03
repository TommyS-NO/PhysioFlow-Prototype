import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Sørg for at dette biblioteket er installert
import { useUser } from "../../Context/UserContext";
import { apiService } from "../../Services/ApiService";
import { theme } from "../../Theme";

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
        input
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
            key={index}
            style={
              msg.sender === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            <Text>{msg.text}</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 10,
    paddingLeft: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#26807C",
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    margin: 5,
    padding: 10,
    backgroundColor: "rgba(38, 128, 124, 0.1)",
    color: "#fff",
    borderRadius: 20,
  },
  userMessageText: {
    color: "#fff",
  },
  aiMessage: {
    alignSelf: "flex-start",
    margin: 5,
    padding: 10,
    backgroundColor: "#e5e5ea",
    borderRadius: 20,
  },
});

export default ChatScreen;