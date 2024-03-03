import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { InputField } from "../Components/CustomInput/CustomInput";
import CustomButton from "../Components/CustomButton/CustomButton";
import GenderSelection from "../Components/GenderSelection/GenderSelection";
import {PickerComponent} from "../Components/Picker/PickerComponent";
import { apiService } from "../Services/APIService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { theme } from "../theme";
import { registerScreenStyles as styles } from "../Styles/Register_Style";


type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

interface UserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "unspecified" | undefined;
  height: number;
  weight: number;
  birthday: string; // Format: YYYY-MM-DD
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
  });
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleInputChange = <T extends keyof UserFormData>(field: T, value: UserFormData[T]) => {
    setFormData({ ...formData, [field]: value });
  };

 const handleRegistration = async () => {
  // Sjekker at passord og bekreftet passord er det samme
  if (formData.password !== formData.confirmPassword) {
    Alert.alert("Feil", "Passordene stemmer ikke overens.");
    return;
  }

  // Validerer lengden på passordet
  if (formData.password.length < 1) {
    Alert.alert("Feil", "Passordet må være minst 6 tegn langt.");
    return;
  }


  const { confirmPassword, ...userToRegister } = formData;

  try {
    // Sender registreringsdata til backend
    const response = await apiService.register(userToRegister);

    // Behandler responsen fra backend
    if (response.message === "Suksess") {
      Alert.alert("Suksess", "Registreringen er fullført.");
      // Navigerer til en annen skjerm etter vellykket registrering
      navigation.reset({
        index: 0,
        routes: [{ name: 'TBA' }], 
      });
    } else {
      Alert.alert("Feil", response.message);
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Feil", "En feil oppsto under registreringen.");
  }
};

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <InputField label="Navn" value={formData.username} onChangeText={(value) => handleInputChange("username", value)} />
            <InputField label="E-post" value={formData.email} onChangeText={(value) => handleInputChange("email", value)} />
            <InputField label="Passord" secureTextEntry value={formData.password} onChangeText={(value) => handleInputChange("password", value)} />
            <InputField label="Bekreft Passord" secureTextEntry value={formData.confirmPassword} onChangeText={(value) => handleInputChange("confirmPassword", value)} />
            <CustomButton title="Neste" onPress={() => setCurrentStep(2)} />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.infoTitle}>Velkommen!</Text>
            <Text style={styles.infoContent}>Vi trenger litt mer informasjon for å fullføre registreringen din.</Text>
            <CustomButton title="Forstått" onPress={() => setCurrentStep(3)} />
          </>
        );
      case 3:
        return (
          <>
            <GenderSelection selectedGender={formData.gender} onSelectGender={(gender) => handleInputChange("gender", gender)} />
            <CustomButton title="Neste" onPress={() => setCurrentStep(4)} />
          </>
        );
      case 4:
        return (
          <>
            <PickerComponent
              mode="date"
              selectedValue={formData.birthday ? new Date(formData.birthday) : new Date()}
              onValueChange={(date) => handleInputChange("birthday", date.toISOString().split("T")[0])}
              label="Fødselsdato"
            />
            <CustomButton title="Neste" onPress={() => setCurrentStep(5)} />
          </>
        );
      case 5:
        return (
          <>
            <PickerComponent
              mode="picker"
              selectedValue={formData.height}
              onValueChange={(value) => handleInputChange("height", value)}
              label="Høyde (cm)"
              values={Array.from({ length: 121 }, (_, i) => 100 + i)}
            />
            <CustomButton title="Neste" onPress={() => setCurrentStep(6)} />
          </>
        );
      case 6:
        return (
          <>
            <PickerComponent
              mode="picker"
              selectedValue={formData.weight}
              onValueChange={(value) => handleInputChange("weight", value)}
              label="Vekt (kg)"
              values={Array.from({ length: 171 }, (_, i) => 30 + i)}
            />
            <CustomButton title="Neste" onPress={() => setCurrentStep(7)} />
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.infoTitle}>Takk for informasjonen!</Text>
            <Text style={styles.infoContent}>Du er nå klar til å begynne å bruke appen.</Text>
            <CustomButton title="Fullfør registrering" onPress={handleRegistration} />
          </>
        );
      default:
        return <Text>Noe gikk galt</Text>;
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderStepContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
