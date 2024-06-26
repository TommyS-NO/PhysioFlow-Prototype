import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	View,
	Text,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { registerScreenStyles as styles } from "./Register_Style";
import GenderSelection from "./GenderSelection/GenderSelection";
import NumberSpinner from "./Picker/NumberSpinner";
import { InputField } from "../../Components/CustomInput/CustomInput";
import PickerComponent from "./Picker/PickerComponent";
import {
	db,
	registerUser,
	saveUserProfile,
} from "../../Services/Firebase/FirebaseConfig";
import { CheckBox } from "react-native-elements";
import { doc, setDoc } from "firebase/firestore";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

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
    height: undefined,
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

  const initializeUserCollections = async (userId: string) => {
    await setDoc(doc(db, "users", userId, "completedExercises", "initial"), {
      initialized: true,
    });
    await setDoc(doc(db, "users", userId, "diagnoses", "initial"), {
      initialized: true,
    });
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
        await initializeUserCollections(userId);
        const userProfile = {
          username: formData.username,
          email: formData.email,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          birthday: formData.birthday,
        };
        await saveUserProfile(userId, userProfile);
        console.log("Brukerprofil og samlinger initialisert for bruker-ID: ", userId);
        navigation.navigate("ProfileScreen");
      } else {
        throw new Error("Kunne ikke registrere bruker.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Feil under registrering", error instanceof Error ? error.message : "Noe gikk galt");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.username) {
          Alert.alert("Feil", "Vennligst fyll inn navn.");
          return false;
        }
        if (!isValidEmail(formData.email)) {
          Alert.alert("Feil", "Vennligst fyll inn en gyldig e-postadresse.");
          return false;
        }
        if (formData.password.length < 6) {
          Alert.alert("Feil", "Passordet må være minst 6 tegn langt.");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert("Feil", "Passordene matcher ikke.");
          return false;
        }
        if (!formData.acceptTerms) {
          Alert.alert("Feil", "Du må godta vilkårene.");
          return false;
        }
        break;
      case 3:
        if (!formData.gender) {
          Alert.alert("Vennligst velg et kjønn.");
          return false;
        }
        break;
      case 4:
        if (!formData.birthday) {
          Alert.alert("Vennligst registrer en fødselsdato.");
          return false;
        }
        break;
      case 5:
        if (!formData.height) {
          Alert.alert("Vennligst registrer en høyde.");
          return false;
        }
        break;
      case 6:
        if (!formData.weight) {
          Alert.alert("Vennligst registrer en vekt.");
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
          <View>
            <View style={styles.formContainer}>
              <Text style={styles.infoTitle}>Fyll inn din informasjon her:</Text>
              <InputField
                label="For- og etternavn:"
                value={formData.username}
                onChangeText={(value) => handleInputChange("username", value)}
                style={styles.input}
              />
              <InputField
                label="E-post:"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                style={styles.input}
              />
              <InputField
                label="Passord:"
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                style={styles.input}
              />
              <InputField
                label="Bekreft passord:"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange("confirmPassword", value)}
                style={styles.input}
              />

              <View style={styles.checkboxContainer}>
                <CheckBox
                  checked={formData.acceptTerms}
                  onPress={() => handleInputChange("acceptTerms", !formData.acceptTerms)}
                  title=""
                />
                <Text style={styles.checkBoxLabel} onPress={navigateToTerms}>
                  Aksepter Terms of Service
                </Text>
              </View>
            </View>
            <View>
              <CustomButton
                title="Neste"
                onPress={handleNextStep}
                buttonStyle={styles.nextButtonStyle}
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.infoTitle}>Velkommen!</Text>
            <Text style={styles.infoText}>
              Vi trenger litt mer informasjon for å fullføre registreringen din.
            </Text>
            <Image
              source={require("../../Assets/Welcome.png")}
              style={styles.welcomeImage}
              accessibilityLabel="A welcoming person"
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Tilbake"
                onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                buttonStyle={styles.button}
              />
              <CustomButton
                title="Neste"
                onPress={handleNextStep}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.formContainer}>
            <GenderSelection
              selectedGender={formData.gender}
              onSelectGender={(gender) => handleInputChange("gender", gender)}
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Tilbake"
                onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                buttonStyle={styles.button}
              />
              <CustomButton
                title="Neste"
                onPress={handleNextStep}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.infoTitle}>Når er du født?</Text>
            <PickerComponent
              mode="date"
              selectedValue={formData.birthday ? new Date(formData.birthday) : new Date()}
              onValueChange={(date: Date) => handleInputChange("birthday", date.toISOString().split("T")[0])}
              label="Fødselsdato"
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Tilbake"
                onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                buttonStyle={styles.button}
              />
              <CustomButton
                title="Neste"
                onPress={handleNextStep}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.infoTitle}>Hvor høy er du?</Text>
            <NumberSpinner
              data={Array.from({ length: 121 }, (_, i) => 150 + i)}
              selectedValue={formData.height}
              onValueChange={(value) => handleInputChange("height", value)}
              unit="cm"
              label="høyde"
            />
            <Image
              source={require("../../Assets/Height.png")}
              style={styles.welcomeImage}
              accessibilityLabel="Person that is measured"
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Tilbake"
                onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                buttonStyle={styles.button}
              />
              <CustomButton
                title="Neste"
                onPress={handleNextStep}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.infoTitle}>Hvor mye veier du?</Text>
            <NumberSpinner
              data={Array.from({ length: 171 }, (_, i) => 45 + i)}
              selectedValue={formData.weight}
              onValueChange={(value) => handleInputChange("weight", value)}
              unit="kg"
              label="vekt"
            />
            <Image
              source={require("../../Assets/Weight.png")}
              style={styles.welcomeImage}
              accessibilityLabel="Person weighting in"
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Tilbake"
                onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                buttonStyle={styles.button}
              />
              <CustomButton
                title="Neste"
                onPress={handleNextStep}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        );
      case 7:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.infoTitle}>Takk for informasjonen!</Text>
            <Text style={styles.infoText}>
              Du er nå klar til å begynne å bruke appen.
            </Text>
            <Image
              source={require("../../Assets/HighFive.png")}
              style={styles.welcomeImage}
              accessibilityLabel="Persons giving high five"
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Tilbake"
                onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                buttonStyle={styles.button}
              />
              <CustomButton
                title="Registrer"
                onPress={handleRegistration}
                buttonStyle={styles.flexibleButton}
              />
            </View>
          </View>
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