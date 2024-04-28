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
import CustomCheckBox from "../../Components/CustomCheckBox/CustomCheckBox";
import GenderSelection from "./GenderSelection/GenderSelection";
import NumberSpinner from "./Picker/NumberSpinner";
import { InputField } from "../../Components/CustomInput/CustomInput";
import PickerComponent from "./Picker/PickerComponent";
import {
  registerUser,
  saveUserProfile,
} from "../../Services/Firebase/FirebaseConfig";
import { theme } from "../../theme";

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
    height: undefined,
    weight: undefined,
    birthday: "",
    acceptTerms: false,
  });
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleInputChange = <T extends keyof UserFormData>(
    field: T,
    value: UserFormData[T]
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
        error instanceof Error ? error.message : "Noe gikk galt"
      );
    }
  };

  //Skal vi ikke ha case 2?
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
            "Vennligst fyll ut alle feltene korrekt og godta vilkårene."
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
          <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.infoTitle}>
                Fyll inn din informasjon her:
              </Text>

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
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                style={styles.input}
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
            <View>
              <CustomButton title="Neste" onPress={handleNextStep} />
            </View>
          </ScrollView>
        );
      case 2:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.infoTitle}>Velkommen! 👋🏻</Text>

            <Text style={styles.infoText}>
              Vi trenger litt mer informasjon for å fullføre registreringen din.
            </Text>
            <Image
              source={require("../../Assets/Welcome.png")}
              style={styles.welcomeImage}
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
          <>
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
          </>
        );
      case 4:
        return (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Når er du født?</Text>
              <PickerComponent
                mode="date"
                selectedValue={
                  formData.birthday ? new Date(formData.birthday) : new Date()
                }
                onValueChange={(date: { toISOString: () => string }) =>
                  handleInputChange(
                    "birthday",
                    date.toISOString().split("T")[0]
                  )
                }
                label="Klikk på datofeltet for å velge fødselsdato:"
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
          </>
        );
      case 5:
        return (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Hvor høy er du?</Text>
              {/* <Text style={styles.subtitle}>Trykk på verdien for å endre</Text> */}
              <NumberSpinner
                data={Array.from({ length: 121 }, (_, i) => 100 + i)}
                selectedValue={formData.height}
                onValueChange={(value) => handleInputChange("height", value)}
                unit="cm"
                label="Høyde"
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
          </>
        );

      case 6:
        return (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Hvor mye veier du?</Text>
              {/* <Text style={styles.subtitle}>Trykk på verdien for å endre</Text> */}
              <NumberSpinner
                data={Array.from({ length: 171 }, (_, i) => 30 + i)}
                selectedValue={formData.weight}
                onValueChange={(value) => handleInputChange("weight", value)}
                unit="kg"
                label="Vekt"
              />

<Image
              source={require("../../Assets/Weight.png")}
              style={styles.welcomeImage}
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
          </>
        );
      case 7:
        return (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.infoTitle}>Takk for informasjonen!</Text>
              <Text style={styles.infoText}>
                Du er nå klar til å begynne å bruke appen.
              </Text>

              <Image
              source={require("../../Assets/HighFive.png")}
              style={styles.welcomeImage}
            />
              <View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Tilbake"
                    onPress={() => setCurrentStep((prevStep) => prevStep - 1)}
                    buttonStyle={styles.button}
                  />
                  <CustomButton
                    title="Fullfør registrering"
                    onPress={handleRegistration}
                    buttonStyle={styles.flexibleButton}
                  />
                </View>
              </View>
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

//----------------------------------------------------------------
// Tester med modaloppsett. Dette funker, men styling er ikke bra eller ferdig.
// ----------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   View,
//   Text,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../../Navigation/navigationTypes";
// import CustomButton from "../../Components/CustomButton/CustomButton";
// import { registerScreenStyles as styles } from "./Register_Style";
// import CustomCheckBox from "../../Components/CustomCheckBox/CustomCheckBox";
// import GenderSelection from "./GenderSelection/GenderSelection";
// import NumberSpinner from "./Picker/NumberSpinner";
// import { InputField } from "../../Components/CustomInput/CustomInput";
// import { inputFieldStyles } from "../../Styles/InputField_Style";
// import PickerComponent from "./Picker/PickerComponent";
// import {
//   registerUser,
//   saveUserProfile,
// } from "../../Services/Firebase/FirebaseConfig";
// import CustomModal from "../../Components/CustomModal/CustomModal";

// type RegisterScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "Register"
// >;

// interface UserFormData {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   gender: "male" | "female" | "unspecified" | undefined;
//   height: number;
//   weight: number;
//   birthday: string;
//   acceptTerms: boolean;
// }
// const RegisterScreen = () => {
//   const navigation = useNavigation<RegisterScreenNavigationProp>();
//   const [formData, setFormData] = useState<UserFormData>({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     gender: undefined,
//     height: undefined,
//     weight: undefined,
//     birthday: "",
//     acceptTerms: false,
//   });
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   const handleInputChange = <T extends keyof UserFormData>(
//     field: T,
//     value: UserFormData[T]
//   ) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const navigateToTerms = () => navigation.navigate("TermsScreen");

//   const handleRegistration = async () => {
//     console.log("Registreringsdata:", formData);
//     if (formData.password !== formData.confirmPassword) {
//       Alert.alert("Feil", "Passordene matcher ikke.");
//       return;
//     }

//     try {
//       const userId = await registerUser(formData.email, formData.password);
//       if (userId) {
//         const profile = {
//           username: formData.username,
//           email: formData.email,
//           gender: formData.gender,
//           height: formData.height,
//           weight: formData.weight,
//           birthday: formData.birthday,
//         };
//         const profileSaved = await saveUserProfile(userId, profile);
//         if (profileSaved) {
//           console.log("Brukerprofil lagret for bruker-ID: ", userId);
//           Alert.alert("Suksess", "Registreringen er fullført.");
//           navigation.navigate("ProfileScreen");
//         } else {
//           throw new Error("Kunne ikke lagre brukerprofil.");
//         }
//       } else {
//         throw new Error("Kunne ikke registrere bruker.");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert(
//         "Feil under registrering",
//         error instanceof Error ? error.message : "Noe gikk galt"
//       );
//     }
//   };

//   const validateCurrentStep = (): boolean => {
//     switch (currentStep) {
//       case 1:
//         if (
//           !formData.username ||
//           !formData.email.includes("@") ||
//           formData.password.length < 1 ||
//           formData.password !== formData.confirmPassword ||
//           !formData.acceptTerms
//         ) {
//           Alert.alert(
//             "Feil",
//             "Vennligst fyll ut alle feltene korrekt og godta vilkårene."
//           );
//           return false;
//         }
//         break;
//           //Skal vi ikke ha case 2?
//       case 3:
//         if (!formData.gender) {
//           Alert.alert("Feil", "Vennligst velg et kjønn.");
//           return false;
//         }
//         break;
//       case 4:
//         if (!formData.birthday) {
//           Alert.alert("Feil", "Vennligst velg en fødselsdato.");
//           return false;
//         }
//         break;
//       case 5:
//         if (!formData.height) {
//           Alert.alert("Feil", "Vennligst velg en høyde.");
//           return false;
//         }
//         break;
//       case 6:
//         if (!formData.weight) {
//           Alert.alert("Feil", "Vennligst velg en vekt.");
//           return false;
//         }
//         break;
//     }
//     return true;
//   };

//   const renderStepContent = () => {
//     let stepTitle = "";
//     let stepContent = <View />;

//     switch (currentStep) {
//       case 1:
//         stepTitle = "Fyll inn din info her";
//         stepContent = (
//           <View style={styles.formContainer}>
//             <InputField
//               label="Navn"
//               value={formData.username}
//               onChangeText={(value) => handleInputChange("username", value)}
//               style={inputFieldStyles.input}
//             />
//             <InputField
//               label="E-post"
//               value={formData.email}
//               onChangeText={(value) => handleInputChange("email", value)}
//               keyboardType="email-address"
//               style={inputFieldStyles.input}
//             />
//             <InputField
//               label="Passord"
//               secureTextEntry
//               value={formData.password}
//               onChangeText={(value) => handleInputChange("password", value)}
//               style={inputFieldStyles.input}
//             />
//             <InputField
//               label="Bekreft passord"
//               secureTextEntry
//               value={formData.confirmPassword}
//               onChangeText={(value) =>
//                 handleInputChange("confirmPassword", value)
//               }
//               style={inputFieldStyles.input}
//             />
//             <View style={styles.checkboxContainer}>
//               <CustomCheckBox
//                 checked={formData.acceptTerms}
//                 onPress={() =>
//                   handleInputChange("acceptTerms", !formData.acceptTerms)
//                 }
//                 title=""
//               />
//               <Text style={styles.checkBoxLabel} onPress={navigateToTerms}>
//                 Aksepter Terms of Service
//               </Text>
//             </View>
//           </View>
//         );
//         break;
//       case 2:
//         stepTitle = "Velkommen!";
//         stepContent = (
//           <View>
//             <Text style={styles.infoContent}>
//               Vi trenger litt mer informasjon for å fullføre registreringen din.
//             </Text>
//           </View>
//         );
//         break;
//       case 3:
//         stepTitle = "Velg kjønn";
//         stepContent = (
//           <GenderSelection
//             selectedGender={formData.gender}
//             onSelectGender={(gender) => handleInputChange("gender", gender)}
//           />
//         );
//         break;
//       case 4:
//         stepTitle = "Velg fødselsdato";
//         stepContent = (
//           <PickerComponent
//             mode="date"
//             selectedValue={
//               formData.birthday ? new Date(formData.birthday) : new Date()
//             }
//             onValueChange={(date: Date) =>
//               handleInputChange("birthday", date.toISOString().split("T")[0])
//             }
//             label="Fødselsdato"
//           />
//         );
//         break;
//       case 5:
//         stepTitle = "Velg høyde";
//         stepContent = (
//           <NumberSpinner
//             data={Array.from({ length: 121 }, (_, i) => 100 + i)}
//             selectedValue={formData.height}
//             onValueChange={(value) => handleInputChange("height", value)}
//             unit="cm"
//             label="Høyde"
//           />
//         );
//         break;
//       case 6:
//         stepTitle = "Velg vekt";
//         stepContent = (
//           <NumberSpinner
//             data={Array.from({ length: 171 }, (_, i) => 30 + i)}
//             selectedValue={formData.weight}
//             onValueChange={(value) => handleInputChange("weight", value)}
//             unit="kg"
//             label="Vekt"
//           />
//         );
//         break;
//       case 7:
//         stepTitle = "Registrering fullført";
//         stepContent = (
//           <View>
//             <Text style={styles.infoContent}>
//               Takk for informasjonen! Du er nå klar til å begynne å bruke appen.
//             </Text>
//             <CustomButton
//               title="Fullfør registrering"
//               onPress={handleRegistration}
//             />
//           </View>
//         );
//         break;
//       default:
//         stepTitle = "Feil";
//         stepContent = <Text>Noe gikk galt</Text>;
//         break;
//     }

//     return (
//       <CustomModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title={"Fyll inn din informasjon"}
//       >
//         {stepContent}
//         <View style={styles.buttonContainer }>
//           {currentStep > 1 && (
//             <CustomButton
//               title="Tilbake"
//               onPress={() => {
//                 setCurrentStep(currentStep - 1);
//                 setModalVisible(true);
//               }}
//             />
//           )}
//           {currentStep < 7 && (
//             <CustomButton
//               title="Neste"
//               onPress={() => {
//                 if (validateCurrentStep()) {
//                   setCurrentStep(currentStep + 1);
//                   if (currentStep < 6) {
//                     setModalVisible(true);
//                   }
//                 }
//               }}
//             />
//           )}
//         </View>
//       </CustomModal>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "iOS" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContentContainer}>
//         <Text style={styles.welcomeTitle}>Velkommen til FysioGO!</Text>
//         <Text style={styles.welcomeText}>
//           Følg trinnene for å opprette din konto. Det tar bare et øyeblikk å
//           komme i gang.
//         </Text>
//         {currentStep !== 7 && (
//           <CustomButton
//             title="Start registrering"
//             onPress={() => setModalVisible(true)}
//           />
//         )}
//         {renderStepContent()}
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default RegisterScreen;

// ----------------------------------------------------------------
