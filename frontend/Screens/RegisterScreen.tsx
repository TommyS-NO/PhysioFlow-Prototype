import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	View,
	Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import FormField from "../Components/FormField/FormField";
import CustomButton from "../Components/CustomButton/CustomButton";
import { apiService } from "../Services/APIService";
import { registerScreenStyles as styles } from "../Styles/Register_Style";
import CustomCheckBox from "../Components/CustomCheckBox/CustomCheckBox";
import {
	registerUser,
	saveUserProfile,
} from "../Services/Firebase/firebaseConfig";

type RegisterScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Register"
>;

interface UserFormData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	gender: "male" | "female" | "unspecified" | undefined;
	height: number;
	weight: number;
	birthday: string;
	acceptTerms: boolean;
}

const RegisterScreen: React.FC = () => {
	const navigation = useNavigation<RegisterScreenNavigationProp>();
	const [formData, setFormData] = useState<UserFormData>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: undefined,
		height: 170,
		weight: 70,
		birthday: "",
		acceptTerms: false,
	});
	const [currentStep, setCurrentStep] = useState<number>(1);

	const handleInputChange = <T extends keyof UserFormData>(
		field: T,
		value: UserFormData[T],
	) => {
		setFormData({ ...formData, [field]: value });
	};

	const navigateToTerms = () => navigation.navigate("TermsScreen");

	const handleRegistration = async () => {
		console.log("Registreringsdata:", formData);
		if (formData.password !== formData.confirmPassword) {
			Alert.alert("Feil", "Passordene matcher ikke.");
			return;
		}

		try {
			console.log("Starter brukerregistrering med e-post og passord.");
			const userId = await registerUser(formData.email, formData.password);
			if (userId) {
				console.log("Bruker registrert, bruker-ID: ", userId);
				console.log("Starter lagring av brukerprofil.");
				const profile = {
					username: formData.username,
					gender: formData.gender,
					height: formData.height,
					weight: formData.weight,
					birthday: formData.birthday,
				};
				const profileSaved = await saveUserProfile(userId, profile);
				if (profileSaved) {
					console.log("Brukerprofil lagret for bruker-ID: ", userId);
					Alert.alert("Suksess", "Registreringen er fullført.");
					navigation.navigate("ProfileScreen");
				} else {
					throw new Error("Kunne ikke lagre brukerprofil.");
				}
			} else {
				throw new Error("Kunne ikke registrere bruker.");
			}
		} catch (error) {
			console.error(error);
			Alert.alert(
				"Feil under registrering",
				error instanceof Error ? error.message : "Noe gikk galt",
			);
		}
	};

	const validateCurrentStep = (): boolean => {
		switch (currentStep) {
			case 1:
				if (
					!formData.username ||
					!formData.email.includes("@") ||
					formData.password.length < 1 ||
					formData.password !== formData.confirmPassword ||
					!formData.acceptTerms
				) {
					Alert.alert(
						"Feil",
						"Vennligst fyll ut alle feltene korrekt og godta vilkårene.",
					);
					return false;
				}
				break;
			case 3:
				if (!formData.gender) {
					Alert.alert("Feil", "Vennligst velg et kjønn.");
					return false;
				}
				break;
			case 4:
				if (!formData.birthday) {
					Alert.alert("Feil", "Vennligst velg en fødselsdato.");
					return false;
				}
				break;
			case 5:
				if (!formData.height) {
					Alert.alert("Feil", "Vennligst velg en høyde.");
					return false;
				}
				break;
			case 6:
				if (!formData.weight) {
					Alert.alert("Feil", "Vennligst velg en vekt.");
					return false;
				}
				break;
		}
		return true;
	};

	const handleNextStep = () => {
		if (validateCurrentStep()) {
			setCurrentStep(currentStep + 1);
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<ScrollView style={styles.container}>
						<View style={styles.formContainer}>
							<FormField
								type="text"
								label="Navn"
								value={formData.username}
								onChangeText={(value) => handleInputChange("username", value)}
							/>
							<FormField
								type="text"
								label="E-post"
								value={formData.email}
								onChangeText={(value) => handleInputChange("email", value)}
								keyboardType="email-address"
							/>
							<FormField
								type="text"
								label="Passord"
								secureTextEntry
								value={formData.password}
								onChangeText={(value) => handleInputChange("password", value)}
							/>
							<FormField
								type="text"
								label="Bekreft Passord"
								secureTextEntry
								value={formData.confirmPassword}
								onChangeText={(value) =>
									handleInputChange("confirmPassword", value)
								}
							/>

							<CustomCheckBox
								checked={formData.acceptTerms}
								onPress={() =>
									handleInputChange("acceptTerms", !formData.acceptTerms)
								}
								title={""}
							/>

							<Text onPress={navigateToTerms}>Aksepter Terms of Service</Text>
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</ScrollView>
				);
			case 2:
				// Steg for informasjonsvisning
				return (
					<>
						<Text style={styles.infoTitle}>Velkommen!</Text>
						<Text style={styles.infoContent}>
							Vi trenger litt mer informasjon for å fullføre registreringen din.
						</Text>
						<CustomButton title="Forstått" onPress={handleNextStep} />
					</>
				);
			case 3:
				return (
					<>
						<FormField
							type="gender"
							selectedGender={formData.gender}
							onSelectGender={(gender) => handleInputChange("gender", gender)}
						/>
						<CustomButton title="Neste" onPress={handleNextStep} />
					</>
				);
			case 4:
				return (
					<>
						<FormField
							type="picker"
							mode="date"
							selectedValue={
								formData.birthday ? new Date(formData.birthday) : new Date()
							}
							onValueChange={(date) =>
								handleInputChange("birthday", date.toISOString().split("T")[0])
							}
							label="Fødselsdato"
						/>
						<CustomButton title="Neste" onPress={handleNextStep} />
					</>
				);
			case 5:
				return (
					<>
						<FormField
							type="picker"
							mode="picker"
							selectedValue={formData.height}
							onValueChange={(value) => handleInputChange("height", value)}
							label="Høyde (cm)"
							values={Array.from({ length: 121 }, (_, i) => 100 + i)}
						/>
						<CustomButton title="Neste" onPress={handleNextStep} />
					</>
				);
			case 6:
				return (
					<>
						<FormField
							type="picker"
							mode="picker"
							selectedValue={formData.weight}
							onValueChange={(value) => handleInputChange("weight", value)}
							label="Vekt (kg)"
							values={Array.from({ length: 171 }, (_, i) => 30 + i)}
						/>
						<CustomButton title="Neste" onPress={handleNextStep} />
					</>
				);
			case 7:
				// Bekreftelse og avslutning av registrering
				return (
					<>
						<Text style={styles.infoTitle}>Takk for informasjonen!</Text>
						<Text style={styles.infoContent}>
							Du er nå klar til å begynne å bruke appen.
						</Text>
						<CustomButton
							title="Fullfør registrering"
							onPress={handleRegistration}
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

export default RegisterScreen;
