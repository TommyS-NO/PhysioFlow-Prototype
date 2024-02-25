import React, { useState, useEffect } from "react";
import {
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputField } from "../Components/InputField/InputField";
import CustomButton from "../Components/CustomButton/CustomButton";
import GenderSelection from "../Components/GenderSelection/GenderSelection";
import { theme } from "../theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { PickerComponent } from "../Components/Picker/PickerComponent";

type RegisterScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Register"
>;

interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	// termsAccepted: boolean;
	gender: "male" | "female" | "unspecified" | undefined;
	height: number;
	weight: number;
	age: number;
}

const RegisterScreen: React.FC = () => {
	const navigation = useNavigation<RegisterScreenNavigationProp>();
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		// termsAccepted: false,
		gender: undefined,
		height: 170,
		weight: 70,
		age: 25,
	});
	const [currentStep, setCurrentStep] = useState<number>(1);

	// useEffect(() => {
	// 	const checkTermsAccepted = async () => {
	// 		const termsAccepted = await AsyncStorage.getItem("termsAccepted");
	// 		setUser((currentUser) => ({
	// 			...currentUser,
	// 			termsAccepted: termsAccepted === "true",
	// 		}));
	// 	};

	// 	checkTermsAccepted();
	// }, []);

	const validateInput = async (step: number): Promise<boolean> => {
		if (step === 1) {
			if (
				!user.name ||
				!user.email ||
				user.password.length < 1 ||
				user.password !== user.confirmPassword
			) {
				Alert.alert(
					"Feil",
					"Sjekk at alle felter er korrekt utfylt og at passordet er minst 1 tegn.",
				);
				return false;
			}
			// if (!user.termsAccepted) {
			// 	Alert.alert("Feil", "Du må akseptere vilkårene for å fortsette.");
			// 	return false;
			// }
		} else if (step === 3 && !user.gender) {
			Alert.alert("Feil", "Vennligst velg et kjønn.");
			return false;
		}
		return true;
	};
	const handleChange = <T extends keyof User>(key: T, value: User[T]) => {
		setUser((prevUser) => ({
			...prevUser,
			[key]: value,
		}));
	};

	const handleNextStep = async () => {
		const isValid = await validateInput(currentStep);
		if (isValid) setCurrentStep(currentStep + 1);
	};

	const handlePreviousStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<InputField
							placeholder="Navn"
							value={user.name}
							onChangeText={(text) => setUser({ ...user, name: text })}
						/>
						<InputField
							placeholder="E-post"
							value={user.email}
							onChangeText={(text) => setUser({ ...user, email: text })}
						/>
						<InputField
							placeholder="Passord"
							secureTextEntry
							value={user.password}
							onChangeText={(text) => setUser({ ...user, password: text })}
						/>
						<InputField
							placeholder="Bekreft Passord"
							secureTextEntry
							value={user.confirmPassword}
							onChangeText={(text) =>
								setUser({ ...user, confirmPassword: text })
							}
						/>
						<View style={styles.termsContainer}>
							<Text style={styles.termsText}>Våre vilkår og betingelser</Text>
							<TouchableOpacity
								onPress={() => navigation.navigate("TermsScreen")}
							>
								<Text style={styles.termsLink}>Les og aksepter</Text>
							</TouchableOpacity>
						</View>
						<CustomButton title="Neste" onPress={handleNextStep} />
					</>
				);
			case 2:
				return (
					<>
						<Text style={styles.infoTitle}>Velkommen</Text>
						<Text style={styles.infoContent}>
							Nå trenger vi litt mer info om deg, vennligst følg stegene videre
						</Text>
						<CustomButton title="Forstått" onPress={handleNextStep} />
					</>
				);
			case 3:
				return (
					<>
						<GenderSelection
							selectedGender={user.gender}
							onSelectGender={(gender) => setUser({ ...user, gender })}
						/>
						<View style={styles.buttonContainer}>
							<CustomButton title="Tilbake" onPress={handlePreviousStep} />
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</>
				);
			case 4:
				return (
					<>
						<PickerComponent
							selectedValue={user.age}
							onValueChange={(value) => handleChange("age", value)}
							label="Hvor gammel er du?"
							values={Array.from({ length: 100 }, (_, i) => i + 1)}
						/>

						<View style={styles.buttonContainer}>
							<CustomButton title="Tilbake" onPress={handlePreviousStep} />
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</>
				);
			case 5:
				return (
					<>
						<PickerComponent
							selectedValue={user.height}
							onValueChange={(value) => handleChange("height", value)}
							label="Høyde (cm)"
							values={Array.from({ length: 220 }, (_, i) => i + 100)} // Anta 100cm til 220cm for høyde
						/>
						<View style={styles.buttonContainer}>
							<CustomButton title="Tilbake" onPress={handlePreviousStep} />
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</>
				);
			case 6:
				return (
					<>
						<PickerComponent
							selectedValue={user.weight}
							onValueChange={(value) => handleChange("weight", value)}
							label="Vekt (kg)"
							values={Array.from({ length: 200 }, (_, i) => i + 30)} // Anta 30kg til 230kg for vekt
						/>
						<View style={styles.buttonContainer}>
							<CustomButton title="Tilbake" onPress={handlePreviousStep} />
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</>
				);
			case 7:
				return (
					<>
						<Text style={styles.infoTitle}>Takk for informasjonen!</Text>
						<Text style={styles.infoContent}>
							Du er nå klar til å begynne å bruke appen.
						</Text>
						<CustomButton
							title="Start"
							onPress={() => navigation.navigate("TBA")}
						/>
					</>
				);
			default:
				return <Text>Noe gikk galt</Text>;
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				{renderStepContent()}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: "center",
		padding: 20,
	},
	termsContainer: {
		marginTop: 10,
	},
	termsText: {
		fontSize: 16,
		color: theme.colors.primary,
	},
	termsLink: {
		fontSize: 16,
		color: theme.colors.secondary,
		textDecorationLine: "underline",
	},
	infoTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	infoContent: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default RegisterScreen;
