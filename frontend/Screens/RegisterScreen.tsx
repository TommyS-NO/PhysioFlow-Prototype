import React, { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView, Platform, View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigationTypes';
import { InputField } from '../Components/CustomInput/CustomInput';
import GenderSelection from '../Components/GenderSelection/GenderSelection';
import { PickerComponent } from '../Components/Picker/PickerComponent';
import CustomButton from '../Components/CustomButton/CustomButton';
import { apiService } from '../Services/APIService';
import { StackNavigationProp } from '@react-navigation/stack';

import { registerScreenStyles as styles } from '../Styles/Register_Style';

// Types and interfaces
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface UserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'unspecified' | undefined;
  height: number;
  weight: number;
  birthday: string; // Format: YYYY-MM-DD
  acceptTerms: boolean;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: undefined,
    height: 170,
    weight: 70,
    birthday: '',
    acceptTerms: false,
  });
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleInputChange = <T extends keyof UserFormData>(field: T, value: UserFormData[T]) => {
    setFormData({ ...formData, [field]: value });
  };

  const navigateToTerms = () => {
    navigation.navigate('TermsScreen');
  };


const handleRegistration = async () => {
  
  if (!formData.email.includes("@")) {
    Alert.alert("Feil", "Vennligst oppgi en gyldig e-postadresse.");
    return;
  }
  if (formData.password.length < 6) {
    Alert.alert("Feil", "Passordet må være minst 6 tegn langt.");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    Alert.alert("Feil", "Passordene stemmer ikke overens.");
    return;
  }

  // logikk for å sende data til backend 
  try {
    const response = await apiService.register({ ...formData });
    if (response.message === "Suksess") {
      Alert.alert("Suksess", "Registreringen er fullført.");
      navigation.navigate('TBA'); 
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    Alert.alert("Feil under registrering", error.message || "Noe gikk galt");
  }
};
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.username || !formData.email.includes('@') || formData.password.length < 6 || formData.password !== formData.confirmPassword || !formData.acceptTerms) {
          Alert.alert('Feil', 'Vennligst fyll ut alle feltene korrekt og godta vilkårene.');
          return false;
        }
        break;
      case 3:
        if (!formData.gender) {
          Alert.alert('Feil', 'Vennligst velg et kjønn.');
          return false;
        }
        break;
      case 4:
        if (!formData.birthday) {
          Alert.alert('Feil', 'Vennligst velg en fødselsdato.');
          return false;
        }
        break;
      case 5:
        if (!formData.height) {
          Alert.alert('Feil', 'Vennligst velg en høyde.');
          return false;
        }
        break;
      case 6:
        if (!formData.weight) {
          Alert.alert('Feil', 'Vennligst velg en vekt.');
          return false;
        }
        break;
      // Legg til flere valideringer her om nødvendig
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
        <>
          <InputField label="Navn" value={formData.username} onChangeText={(value) => handleInputChange('username', value)} />
          <InputField label="E-post" value={formData.email} onChangeText={(value) => handleInputChange('email', value)} keyboardType="email-address" />
          <InputField label="Passord" secureTextEntry value={formData.password} onChangeText={(value) => handleInputChange('password', value)} />
          <InputField label="Bekreft Passord" secureTextEntry value={formData.confirmPassword} onChangeText={(value) => handleInputChange('confirmPassword', value)} />

 <CheckBox
  checked={formData.acceptTerms}
  onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
/>

          <Text onPress={navigateToTerms}>Aksepter Terms of Service</Text>
          <CustomButton title="Neste" onPress={handleNextStep} />
        </>
      );
    case 2:
      // Steg for informasjonsvisning
      return (
        <>
          <Text style={styles.infoTitle}>Velkommen!</Text>
          <Text style={styles.infoContent}>Vi trenger litt mer informasjon for å fullføre registreringen din.</Text>
          <CustomButton title="Forstått" onPress={handleNextStep} />
        </>
      );
    case 3:
      // Valg av kjønn
      return (
        <>
          <GenderSelection selectedGender={formData.gender} onSelectGender={(gender) => handleInputChange('gender', gender)} />
          <CustomButton title="Neste" onPress={handleNextStep} />
        </>
      );
    case 4:
      // Velg fødselsdato
      return (
        <>
          <PickerComponent mode="date" selectedValue={formData.birthday ? new Date(formData.birthday) : new Date()} onValueChange={(date) => handleInputChange('birthday', date.toISOString().split('T')[0])} label="Fødselsdato" />
          <CustomButton title="Neste" onPress={handleNextStep} />
        </>
      );
    case 5:
      // Velg høyde
      return (
        <>
          <PickerComponent mode="picker" selectedValue={formData.height} onValueChange={(value) => handleInputChange('height', value)} label="Høyde (cm)" values={Array.from({ length: 121 }, (_, i) => 100 + i)} />
          <CustomButton title="Neste" onPress={handleNextStep} />
        </>
      );
    case 6:
      // Velg vekt
      return (
        <>
          <PickerComponent mode="picker" selectedValue={formData.weight} onValueChange={(value) => handleInputChange('weight', value)} label="Vekt (kg)" values={Array.from({ length: 171 }, (_, i) => 30 + i)} />
          <CustomButton title="Neste" onPress={() => {
            // Siste validering før fullføring
            if (!formData.weight || !formData.height || !formData.birthday || !formData.gender) {
              Alert.alert("Feil", "Alle felt må være fylt ut før du kan fortsette.");
              return;
            }
            handleNextStep();
          }} />
        </>
      );
    case 7:
      // Bekreftelse og avslutning av registrering
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
