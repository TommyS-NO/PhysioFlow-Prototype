import React from "react";
import {
	Alert,
	Image,
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import CustomButton from "../Components/CustomButton/CustomButton";
import { InputField } from "../Components/CustomInput/CustomInput";
import { theme } from "../theme";
import { frontScreenStyles } from "../Styles/FrontScreen_Style";
import { apiService } from "../Services/APIService";
import { useUser } from "../Context/UserContext";
import useFormValidation from "../Validation/useFormValidation";
import loginValidation from "../Validation/loginValidation";

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

interface LoginFormData {
	username: string;
	password: string;
}

const initialState: LoginFormData = {
	username: "",
	password: "",
};

const FrontScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { dispatch } = useUser();
	const { values, errors, handleChange, handleSubmit } =
		useFormValidation<LoginFormData>(initialState, loginValidation);

	const handleLogin = async () => {
		handleSubmit(async () => {
			try {
				const response = await apiService.login(
					values.username,
					values.password,
				);
				if (response.message === "Suksess" && response.data) {
					dispatch({ type: "LOGIN", token: response.data.token });
					Alert.alert("Suksess", "Du er nå logget inn.");
					navigation.navigate("TBA");
				} else {
					Alert.alert("Feil ved innlogging", response.message || "Ukjent feil");
				}
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "Noe gikk galt med innloggingen. Vennligst prøv igjen.";
				Alert.alert("Feil", errorMessage);
			}
		});
	};

	const handleRegister = () => {
		navigation.navigate("Register", { termsAccepted: true });
	};

	const handleHelp = () => {
		Alert.alert("Brukerveiledning", "Brukerveiledningen er under utvikling.");
	};
	return (
		<>
			<KeyboardAvoidingView />
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
					<Icon name="help-circle" size={24} color={theme.colors.helpButton} />
				</TouchableOpacity>
				<View style={frontScreenStyles.loginContainer}>
					<Text style={frontScreenStyles.loginText}>Logg inn</Text>
					<InputField
						style={frontScreenStyles.input}
						placeholder="Epost"
						value={values.username}
						onChangeText={(value) => handleChange("username", value)}
						autoCapitalize="none"
					/>
					<Text style={frontScreenStyles.errorText}>{errors.username}</Text>
					<InputField
						style={frontScreenStyles.input}
						placeholder="Passord"
						secureTextEntry
						value={values.password}
						onChangeText={(value) => handleChange("password", value)}
						autoCapitalize="none"
					/>
					<Text style={frontScreenStyles.errorText}>{errors.password}</Text>
					<CustomButton
						title="Logg inn"
						onPress={handleLogin}
						iconName="login"
						buttonStyle={frontScreenStyles.loginButton}
					/>
					<Text style={frontScreenStyles.registerText}>
						Ikke medlem? Registrer deg her
					</Text>
					<CustomButton
						title="Registrer deg"
						onPress={handleRegister}
						iconName="account-plus"
						buttonStyle={frontScreenStyles.registerButton}
					/>
				</View>
			</View>
			<KeyboardAvoidingView />
		</>
	);
};

export default FrontScreen;
