import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { InputField } from "../../Components/CustomInput/CustomInput";
import { theme } from "../../theme";
import FooterNavigation from "../../Navigation/FooterNavigation/FooterNavigation";

const ContactScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [charCount, setCharCount] = useState(0);
	const maxChar = 500;

	const navigation = useNavigation();

	const handleTextChange = (text: string) => {
		if (text.length <= maxChar) {
			setMessage(text);
			setCharCount(text.length);
		} else {
			Alert.alert(
				"Maksimal lengde",
				"Du har nådd den maksimale lengden på meldingen.",
			);
		}
	};

	const navigateToSettings = () => {
		Alert.alert(
			"Melding sendt",
			"Melding sendt til behandler",
			[{ text: "OK", onPress: () => console.log("OK Pressed") }],
			{ cancelable: false },
		);

		setTimeout(() => {
			navigation.navigate("SettingsScreen");
		}, 1000);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.formContainer}>
					<Text style={styles.headerText}>Kontakt oss ☎️</Text>
					<InputField
						label="Navn:"
						value={name}
						onChangeText={setName}
						style={styles.input}
					/>
					<InputField
						label="E-post:"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						style={styles.input}
					/>
					<InputField
						label="Mobilnummer:"
						value={phone}
						onChangeText={setPhone}
						keyboardType="phone-pad"
						style={styles.input}
					/>
					<InputField
						label="Hva kan vi hjelpe deg med?"
						value={message}
						onChangeText={handleTextChange}
						multiline
						numberOfLines={10}
						style={styles.textArea}
					/>
					<Text style={styles.charCount}>{maxChar - charCount} tegn igjen</Text>
					<CustomButton
						title="Send melding"
						onPress={navigateToSettings}
						iconName="send"
					/>
				</View>
			</ScrollView>
			<FooterNavigation />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerText: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 5,
		marginTop: 5,
		textAlign: "center",
	},
	input: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	textArea: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ddd",
		textAlignVertical: "top",
		height: 90,
	},
	formContainer: {
		backgroundColor: "#FFFFFF",
		padding: 15,
		marginTop: 20,
		borderRadius: 8,
		margin: 25,
		alignItems: "center",
	},
	charCount: {
		textAlign: "right",
		fontSize: 12,
		color: theme.colors.secondary,
		marginBottom: 1,
	},
});

export default ContactScreen;
