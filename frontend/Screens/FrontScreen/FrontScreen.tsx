import React, { useState } from "react";
import {
	Alert,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { InputField } from "../../Components/CustomInput/CustomInput";
import { theme } from "../../theme";
import { frontScreenStyles } from "./FrontScreen_Style";
import { useUser } from "../../Context/UserContext";
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
	auth,
	fetchUserDetailsFromFirestore,
} from "../../Services/Firebase/FirebaseConfig";

const isFirebaseError = (error: unknown): error is FirebaseError => {
	return (error as FirebaseError).message !== undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

const FrontScreen = () => {
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
			const { userProfile, diagnoses, exercises } =
				await fetchUserDetailsFromFirestore(user.uid);

			if (!userProfile) {
				Alert.alert("Feil", "Kunne ikke hente brukerdetaljer.");
				return;
			}

			dispatch({
				type: "LOGIN",
				token,
				userId: user.uid,
				userDetails: userProfile,
				diagnoses,
				completedExercises: exercises,
			});

			setEmail("");
			setPassword("");
			navigation.navigate("ProfileScreen", {
				userName: userProfile.username || "Bruker",
			});
		} catch (error) {
			if (isFirebaseError(error)) {
				setError(error.message);
				Alert.alert(
					"Feil ved innlogging",
					"Du har tastet feil brukernavn eller passord.",
				);
			} else {
				Alert.alert("Feil ved innlogging", "En ukjent feil oppsto.");
			}
		}
	};

	const handleForgotPassword = async () => {
		if (!email) {
			Alert.alert("Feil", "Vennligst skriv inn e-postadressen din.");
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			Alert.alert("Feil", "Vennligst skriv inn en gyldig e-postadresse.");
			return;
		}

		Alert.alert(
			"Tilbakestille passord",
			`Vil du sende en e-post for å tilbakestille passordet til: ${email}?`,
			[
				{
					text: "Avbryt",
					style: "cancel",
				},
				{
					text: "Send",
					onPress: async () => {
						try {
							await sendPasswordResetEmail(auth, email);
							Alert.alert(
								"E-post sendt!",
								"Gå til din e-post for å tilbakestille passordet.",
							);
						} catch (error) {
							if (error instanceof Error) {
								Alert.alert("Feil", error.message);
							} else {
								Alert.alert("Feil", "En ukjent feil oppsto.");
							}
						}
					},
				},
			],
		);
	};

	const handleRegister = () => {
		navigation.navigate("Register");
	};

	const handleHelp = () => {
		navigation.navigate("UserGuideScreen");
	};

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ImageBackground
					source={require("../../Assets/Stretch3.png")}
					style={frontScreenStyles.container}
					resizeMode="cover"
				>
					<View style={frontScreenStyles.container}>
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
							<Text style={frontScreenStyles.titleText}>PhysioFlow</Text>
							<Text style={frontScreenStyles.loginText}>Logg inn</Text>

							<InputField
								style={frontScreenStyles.input}
								placeholder="Epost"
								value={email}
								onChangeText={setEmail}
								autoCapitalize="none"
								keyboardType="email-address"
							/>

							<InputField
								style={frontScreenStyles.input}
								placeholder="Passord"
								secureTextEntry
								value={password}
								onChangeText={setPassword}
								autoCapitalize="none"
							/>

							<CustomButton title="Logg inn" onPress={handleLogin} />

							<TouchableOpacity onPress={handleForgotPassword}>
								<Text style={frontScreenStyles.linkText}>Glemt passord?</Text>
							</TouchableOpacity>

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
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		</>
	);
};

export default FrontScreen;
