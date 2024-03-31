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
import { RootStackParamList } from "../../Navigation/navigationTypes";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { registerScreenStyles as styles } from "./Register_Style";
import CustomCheckBox from "../../Components/CustomCheckBox/CustomCheckBox";
import GenderSelection from "./GenderSelection/GenderSelection";
import NumberSpinner from "./Picker/NumberSpinner";
import { InputField } from "../../Components/CustomInput/CustomInput";
import PickerComponent from "./Picker/PickerComponent";
import {
	registerUser,
	saveUserProfile,
} from "../../Services/Firebase/firebaseConfig";

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
const RegisterScreen = () => {
	const navigation = useNavigation<RegisterScreenNavigationProp>();
	const [formData, setFormData] = useState<UserFormData>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: undefined,
		height: undefined, // Set initial height to undefined
		weight: undefined,
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
			const userId = await registerUser(formData.email, formData.password);
			if (userId) {
				const profile = {
					username: formData.username,
					email: formData.email,
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
					<ScrollView
						style={styles.container}
						contentContainerStyle={styles.scrollContentContainer}
					>
						<Text style={styles.infoTitle}>Fyll inn din info her</Text>
						<View style={styles.formContainer}>
							<InputField
								label="Navn"
								value={formData.username}
								onChangeText={(value) => handleInputChange("username", value)}
							/>
							<InputField
								label="E-post"
								value={formData.email}
								onChangeText={(value) => handleInputChange("email", value)}
								keyboardType="email-address"
							/>
							<InputField
								label="Passord"
								secureTextEntry
								value={formData.password}
								onChangeText={(value) => handleInputChange("password", value)}
							/>
							<InputField
								label="Bekreft Passord"
								secureTextEntry
								value={formData.confirmPassword}
								onChangeText={(value) =>
									handleInputChange("confirmPassword", value)
								}
							/>

							<View style={styles.checkboxContainer}>
								<CustomCheckBox
									checked={formData.acceptTerms}
									onPress={() =>
										handleInputChange("acceptTerms", !formData.acceptTerms)
									}
									title={""}
								/>

								<Text style={styles.checkBoxLabel} onPress={navigateToTerms}>
									Aksepter Terms of Service
								</Text>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<CustomButton
								title="Neste"
								onPress={handleNextStep}
								style={styles.nextButton}
							/>
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
						<GenderSelection
							selectedGender={formData.gender}
							onSelectGender={(gender) => handleInputChange("gender", gender)}
						/>
						<View style={styles.buttonContainer}>
							<CustomButton
								title="Tilbake"
								onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
								buttonStyle={styles.button} // Apply half-width styles
							/>
							<CustomButton
								title="Neste"
								onPress={handleNextStep}
								buttonStyle={styles.button} // Apply half-width styles
							/>
						</View>
					</>
				);
			case 4:
				return (
					<>
						<PickerComponent
							mode="date"
							selectedValue={
								formData.birthday ? new Date(formData.birthday) : new Date()
							}
							onValueChange={(date: { toISOString: () => string }) =>
								handleInputChange("birthday", date.toISOString().split("T")[0])
							}
							label="Fødselsdato"
						/>
						<View style={styles.previousButton}>
							<CustomButton
								title="Tilbake"
								onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
							/>
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</>
				);
			case 5:
				return (
					<>
						<Text style={styles.title}>Valg av Høyde</Text>
						<Text style={styles.subtitle}>Trykk på verdien for å endre</Text>
						<NumberSpinner
							data={Array.from({ length: 121 }, (_, i) => 100 + i)}
							selectedValue={formData.height}
							onValueChange={(value) => handleInputChange("height", value)}
							unit="cm"
							label="Høyde"
						/>
						<View style={styles.previousButton}>
							<CustomButton
								title="Tilbake"
								onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
							/>
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
					</>
				);

			case 6:
				return (
					<>
						<Text style={styles.title}>Valg av Vekt</Text>
						<Text style={styles.subtitle}>Trykk på verdien for å endre</Text>
						<NumberSpinner
							data={Array.from({ length: 171 }, (_, i) => 30 + i)}
							selectedValue={formData.weight}
							onValueChange={(value) => handleInputChange("weight", value)}
							unit="kg"
							label="Vekt"
						/>
						<View style={styles.nextButton}>
							<CustomButton
								title="Tilbake"
								onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
							/>
							<CustomButton title="Neste" onPress={handleNextStep} />
						</View>
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
						<View style={styles.nextButton}>
							<CustomButton
								title="Tilbake"
								onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
							/>
							<CustomButton
								title="Fullfør registrering"
								onPress={handleRegistration}
							/>
						</View>
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
			<ScrollView contentContainerStyle={styles.scrollContentContainer}>
				{renderStepContent()}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;
