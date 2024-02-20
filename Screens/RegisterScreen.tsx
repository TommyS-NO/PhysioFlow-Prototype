import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Switch,
	Image,
	ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type RegisterScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Register"
>;

interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	termsAccepted: boolean;
}

const RegisterScreen: React.FC = () => {
	const navigation = useNavigation<RegisterScreenNavigationProp>();
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		termsAccepted: false,
	});

	const handleRegister = async () => {
		if (!user.termsAccepted) {
			Alert.alert("Error", "Du må Akseptere Terms of Service");
			return;
		}

		if (user.password !== user.confirmPassword) {
			Alert.alert("Error", "Passord matcher ikke");
			return;
		}

		try {
			await AsyncStorage.setItem("user", JSON.stringify(user));
			navigation.navigate("InfoScreen");
		} catch (error) {
			Alert.alert("Error", "Noe gikk galt under lagringen");
		}
	};

	const onValueChange = (key: keyof User, value: string | boolean) => {
		setUser({ ...user, [key]: value });
	};

	const toggleTermsAccepted = () => {
		setUser({ ...user, termsAccepted: !user.termsAccepted });
	};

	return (
		<ImageBackground
			source={require("../Assets/mountain.jpg")}
			style={styles.container}
		>
			<View style={styles.logoContainer}>
				<Image
					source={require("../Assets/logoReact.png")}
					style={styles.logo}
				/>
			</View>
			<TextInput
				style={styles.input}
				placeholder="Navn"
				onChangeText={(text) => onValueChange("name", text)}
				value={user.name}
			/>
			<TextInput
				style={styles.input}
				placeholder="E-post"
				onChangeText={(text) => onValueChange("email", text)}
				value={user.email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Passord"
				onChangeText={(text) => onValueChange("password", text)}
				secureTextEntry
				value={user.password}
			/>
			<TextInput
				style={styles.input}
				placeholder="Bekreft Passord"
				onChangeText={(text) => onValueChange("confirmPassword", text)}
				secureTextEntry
				value={user.confirmPassword}
			/>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={user.termsAccepted ? "#f5dd4b" : "#f4f3f4"}
				onValueChange={toggleTermsAccepted}
				value={user.termsAccepted}
			/>
			<Text
				style={styles.termsText}
				onPress={() => navigation.navigate("TermsScreen")}
			>
				Jeg godtar vilkårene
			</Text>
			<TouchableOpacity style={styles.button} onPress={handleRegister}>
				<Text style={styles.buttonText}>Opprett bruker</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.primary,
	},
	logoContainer: {
		marginBottom: theme.spacing.large,
	},
	logo: {
		height: 100,
		width: 100,
		resizeMode: "contain",
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		width: "80%",
		padding: theme.spacing.medium,
		borderRadius: theme.borderRadius.medium,
		fontSize: theme.fontSize.regular,
		marginVertical: theme.spacing.small,
		color: theme.colors.text,
		borderColor: theme.colors.primary,
		borderWidth: 1,
	},
	button: {
		backgroundColor: theme.colors.button,
		paddingVertical: theme.spacing.medium,
		paddingHorizontal: theme.spacing.large,
		borderRadius: theme.borderRadius.medium,
	},
	buttonText: {
		color: theme.colors.text,
		fontSize: theme.fontSize.title,
	},
	termsText: {
		color: theme.colors.text,
		marginTop: theme.spacing.small,
	},
});

export default RegisterScreen;
