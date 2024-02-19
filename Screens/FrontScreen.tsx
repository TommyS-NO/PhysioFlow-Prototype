import React, { useState } from "react";
import {
	Alert,
	ImageBackground,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

import CustomButton from "../Components/Button/Button";
import { theme } from "../theme";

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

const FrontScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const testUser = {
		username: "admin",
		password: "admin",
	};

	const handleLogin = () => {
		if (username === testUser.username && password === testUser.password) {
			console.log("Innlogging suksessfull");
			Alert.alert("Suksess", "Du er nå logget inn!");
		} else {
			Alert.alert("Feil", "Brukernavn eller passord er feil");
		}
	};

	const handleRegister = () => {
		navigation.navigate("Register");
	};

	const handleHelp = () => {
		Alert.alert("Brukerveiledning", "Brukerveiledningen er under utvikling.");
	};

	return (
		<ImageBackground
			source={require("../Assets/mountain.jpg")}
			style={styles.container}
		>
			<View style={styles.topContainer}>
				<Image
					source={require("../Assets/logoReact.png")}
					style={styles.logo}
				/>
				<Text style={styles.titleText}>Tittel</Text>
			</View>

			<TouchableOpacity onPress={handleHelp} style={styles.helpButton}>
				<Icon name="help-circle" size={24} color={theme.colors.text} />
			</TouchableOpacity>

			<View style={styles.loginContainer}>
				<Text style={styles.loginText}>Logg inn</Text>
				<TextInput
					style={styles.input}
					placeholder="Epost"
					value={username}
					onChangeText={setUsername}
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="Passord"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					autoCapitalize="none"
				/>
				<CustomButton
					title="Logg inn"
					onPress={handleLogin}
					iconName="login"
					buttonStyle={styles.loginButton}
				/>
				<Text style={styles.registerText}>Ikke medlem? Registrer deg her</Text>
				<CustomButton
					title="Registrer deg"
					onPress={handleRegister}
					iconName="account-plus"
					buttonStyle={styles.registerButton}
				/>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
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
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 5,
	},
	helpButton: {
		position: "absolute",
		right: 10,
		top: 50,
		padding: 10,
		zIndex: 1,
	},
	loginContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: 20,
		borderRadius: 10,
		width: "80%",
		alignItems: "center",
	},
	loginText: {
		fontSize: 20,
		marginBottom: 20,
	},
	input: {
		height: 40,
		width: "100%",
		marginVertical: 10,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 10,
	},
	loginButton: {
		backgroundColor: theme.colors.primary,
		width: "100%",
		marginVertical: theme.spacing.small,
	},
	registerButton: {
		backgroundColor: theme.colors.primary,
		width: "80%",

		marginVertical: theme.spacing.small,
	},
	registerText: {
		marginTop: 20,
		fontSize: 12,
	},
});

export default FrontScreen;
