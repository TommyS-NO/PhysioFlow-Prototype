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
import { PickerComponent } from "../Components/Picker/PickerComponent";
import { apiService } from "../Services/APIService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { registerScreenStyles as styles } from "../Styles/Register_Style";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

interface User {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "unspecified" | undefined;
  height: number;
  weight: number;
  birthday: Date | string; // Format: YYYY-MM-DD
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    gender: undefined,
    height: 170,
    weight: 70,
    birthday: new Date().toISOString().split("T")[0],
  });
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleInputChange = <T extends keyof User>(field: T, value: User[T]) => {
  if (field === "birthday" && value instanceof Date) {
    setUser(prev => ({ ...prev, [field]: value.toISOString().split("T")[0] }));
  } else {
    setUser(prev => ({ ...prev, [field]: value }));
  }
};

  const handleRegistration = async () => {
    if (user.password.length < 6) {
      Alert.alert("Feil", "Passordet må være minst 6 tegn langt.");
      return;
    }

    try {
      
      const { email, password, name, gender, height, weight, birthday } = user;
      const response = await apiService.register({ username: name, email, password, gender, height, weight, birthday });

      if (response.message === "Success") {
        Alert.alert("Suksess", "Registreringen er fullført.");
        // navigation.navigate("Login"); // Oppdater med korrekt navigasjonsdestinasjon
      } else {
        Alert.alert("Feil", response.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Feil", "En feil oppsto under registreringen.");
    }
  };

  // Render funksjon for å vise ulike steg basert på `currentStep`
 const renderStepContent = () => {
  switch (currentStep) {
    case 1:
      return (
        <>
          <InputField
            placeholder="Navn"
            value={user.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <InputField
            placeholder="E-post"
            value={user.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <CustomButton
            title="Neste"
            onPress={() => setCurrentStep(currentStep + 1)}
          />
        </>
      );
    case 2:
      return (
        <>
          <Text style={styles.infoTitle}>Velkommen!</Text>
          <Text style={styles.infoContent}>
            Vi trenger litt mer informasjon for å fullføre registreringen din.
          </Text>
          <CustomButton
            title="Forstått"
            onPress={() => setCurrentStep(currentStep + 1)}
          />
        </>
      );
    case 3:
      return (
        <>
          <GenderSelection
            selectedGender={user.gender}
            onSelectGender={(gender) => handleInputChange("gender", gender)}
          />
          <PickerComponent
            mode="date"
            selectedValue={new Date(user.birthday)}
            onValueChange={(date) =>
              handleInputChange("birthday", date.toISOString().split("T")[0])
            }
            label="Fødselsdato"

          />
          <CustomButton
            title="Neste"
            onPress={() => setCurrentStep(currentStep + 1)}
          />
        </>
      );
    case 4:
      return (
        <>
          <PickerComponent
            mode="picker"
            selectedValue={user.height}
            onValueChange={(value) => handleInputChange("height", value)}
            label="Høyde (cm)"
            values={Array.from({ length: 121 }, (_, i) => 100 + i)}
          />
          <PickerComponent
            mode="picker"
            selectedValue={user.weight}
            onValueChange={(value) => handleInputChange("weight", value)}
            label="Vekt (kg)"
            values={Array.from({ length: 171 }, (_, i) => 30 + i)}
          />
          <CustomButton
            title="Neste"
            onPress={() => setCurrentStep(currentStep + 1)}
          />
        </>
      );
    case 5:
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderStepContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
