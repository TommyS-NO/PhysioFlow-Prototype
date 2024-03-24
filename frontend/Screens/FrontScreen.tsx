import React, { useState } from "react";
import {
	Alert,
	Image,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import CustomButton from "../Components/CustomButton/CustomButton";
import { InputField } from "../Components/CustomInput/CustomInput";
import { theme } from "../theme";
import { frontScreenStyles } from "../Styles/FrontScreen_Style";
import { useUser } from "../Context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { auth } from "../Services/Firebase/firebaseConfig";

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

const FrontScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { dispatch } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>("");

	const handleLogin = async () => {
		if (!email.trim()) {
			setError("E-post er påkrevd.");
			Alert.alert("Feil", "E-post er påkrevd.");
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Ugyldig e-postadresse.");
			Alert.alert("Feil", "Ugyldig e-postadresse.");
			return;
		}
		if (!password) {
			setError("Passord er påkrevd.");
			Alert.alert("Feil", "Passord er påkrevd.");
			return;
		}
		setError("");
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			const token = await user.getIdToken();
			const userName = user.displayName || "Bruker";

			dispatch({ type: "LOGIN", token: token });

			// Naviger til ProfileScreen med brukernavn med en type assertion
			navigation.navigate("ProfileScreen", { userName: userName as string });
			Alert.alert("Suksess", "Du er nå logget inn.");
		} catch (error) {
			const firebaseError = error as FirebaseError;
			setError(firebaseError.message);
			Alert.alert("Feil ved innlogging", firebaseError.message);
		}
	};

	const handleRegister = () => {
		navigation.navigate("Register", { termsAccepted: true });
	};

	const handleHelp = () => {
		Alert.alert("Brukerveiledning", "Brukerveiledningen er under utvikling.");
	};

	const handleAboutPress = () => {
		navigation.navigate("AboutScreen");
	};

	const handleContactPress = () => {
		navigation.navigate("ContactScreen");
	};

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={frontScreenStyles.container}>
					<View style={frontScreenStyles.topContainer}>
						<Image
							source={require("../Assets/Logo.png")}
							style={frontScreenStyles.logo}
						/>
						<Text style={frontScreenStyles.titleText}>Tittel</Text>
					</View>

					<TouchableOpacity
						onPress={handleHelp}
						style={frontScreenStyles.helpButton}
					>
						<Icon
							name="help-circle"
							size={24}
							color={theme.colors.helpButton}
						/>
					</TouchableOpacity>

					<View style={frontScreenStyles.loginContainer}>
						<Text style={frontScreenStyles.loginText}>Logg inn</Text>

						<InputField
							style={frontScreenStyles.input}
							placeholder="Epost"
							value={email}
							onChangeText={setEmail}
							autoCapitalize="none"
							keyboardType="email-address"
						/>
						{error && <Text style={frontScreenStyles.errorText}>{error}</Text>}

						<InputField
							style={frontScreenStyles.input}
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
							buttonStyle={frontScreenStyles.loginButton}
						/>

						<Text style={frontScreenStyles.registerText}>
							Ikke medlem?{" "}
							<Text
								style={frontScreenStyles.registerLinkText}
								onPress={handleRegister}
							>
								Registrer deg her
							</Text>
						</Text>
					</View>

					<View style={frontScreenStyles.bottomLinksContainer}>
						<TouchableOpacity onPress={handleAboutPress}>
							<Text style={frontScreenStyles.bottomLinkText}>Om oss</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleContactPress}>
							<Text style={frontScreenStyles.bottomLinkText}>Kontakt oss</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</>
	);
};

export default FrontScreen;
