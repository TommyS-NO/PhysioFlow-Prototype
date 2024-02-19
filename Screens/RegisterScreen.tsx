import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	Alert,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../Components/Button/Button";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { theme } from "../theme";

type RegisterScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Front"
>;

interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	gender: string;
	birthYear: number;
	height: number;
	focusAreas: string[];
}

const RegisterScreen: React.FC = () => {
	const navigation = useNavigation<RegisterScreenNavigationProp>();
	const [step, setStep] = useState<number>(1);
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "",
		birthYear: new Date().getFullYear(),
		height: 160,
		focusAreas: [],
	});

	const handleNextStep = async () => {
		if (step === 1) {
			// Validering av trinn 1 data
			if (user.name && user.email && user.password && user.confirmPassword) {
				if (user.password === user.confirmPassword) {
					setStep(step + 1); // Går til neste trinn
				} else {
					Alert.alert("Feil", "Passordene matcher ikke.");
				}
			} else {
				Alert.alert("Feil", "Alle feltene må fylles ut.");
			}
		}
		// Legg til logikk for neste steg
	};

	const onValueChange = (key: keyof User, value: string | number) => {
		setUser({ ...user, [key]: value });
	};

	const renderStepContent = () => {
		if (step === 1) {
			return (
				<>
					<TextInput
						style={styles.input}
						placeholder="Navn"
						value={user.name}
						onChangeText={(text) => onValueChange("name", text)}
					/>
					<TextInput
						style={styles.input}
						placeholder="E-post"
						value={user.email}
						onChangeText={(text) => onValueChange("email", text)}
					/>
					<TextInput
						style={styles.input}
						placeholder="Passord"
						secureTextEntry
						value={user.password}
						onChangeText={(text) => onValueChange("password", text)}
					/>
					<TextInput
						style={styles.input}
						placeholder="Bekreft passord"
						secureTextEntry
						value={user.confirmPassword}
						onChangeText={(text) => onValueChange("confirmPassword", text)}
					/>
					<CustomButton title="Neste" onPress={handleNextStep} iconName={""} />
				</>
			);
		}
		// Legg til rendring for andre steg
	};

	return (
		<ImageBackground
			style={styles.container}
			source={require("../Assets/mountain.jpg")}
		>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{renderStepContent()}
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		padding: theme.spacing.large,
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.primary,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: theme.spacing.medium,
		marginBottom: theme.spacing.medium,
		borderRadius: theme.borderRadius.medium,
		color: theme.colors.text,
		fontSize: theme.fontSize.regular,
	},
});

export default RegisterScreen;
