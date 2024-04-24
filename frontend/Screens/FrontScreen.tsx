import React, { useState } from "react";
import {
  Alert,
  Image,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import CustomButton from "../Components/CustomButton/CustomButton";
import { InputField } from "../Components/CustomInput/CustomInput";
import { theme } from "../theme";
import { frontScreenStyles } from "../Styles/FrontScreen_Style";
import { useUser } from "../Context/UserContext";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  auth,
  fetchUserDetailsFromFirestore,
} from "../Services/Firebase/firebaseConfig";

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

const FrontScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { dispatch } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("E-post er påkrevd.");
      Alert.alert("Feil", "E-post er påkrevd.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Ugyldig e-postadresse.");
      Alert.alert("Feil", "Ugyldig e-postadresse.");
      return;
    }
    if (!password) {
      setError("Passord er påkrevd.");
      Alert.alert("Feil", "Passord er påkrevd.");
      return;
    }
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userDetails = await fetchUserDetailsFromFirestore(user.uid);
      if (!userDetails) {
        Alert.alert("Feil", "Kunne ikke hente brukerdetaljer.");
        return;
      }
      dispatch({
        type: "LOGIN",
        token,
        userId: user.uid,
        userDetails,
      });
      setEmail('');
      setPassword('');
      navigation.navigate("ProfileScreen", {
        userName: userDetails.username || "Bruker",
      });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
      Alert.alert(
        "Feil ved innlogging",
         "Du har tastet feil brukernavn eller passord."
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Feil", "Vennligst skriv inn e-postadressen din.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Feil", "Vennligst skriv inn en gyldig e-postadresse.");
      return;
    }

    Alert.alert(
      "Tilbakestille passord",
      "Vil du sende en e-post for å tilbakestille passordet til: " +
        email +
        "?",
      [
        {
          text: "Avbryt",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: async () => {
            try {
              await sendPasswordResetEmail(auth, email);
              Alert.alert(
                "E-post sendt!",
                "Gå til din e-post for å tilbakestille passordet."
              );
            } catch (error) {
              Alert.alert("Feil", error.message);
            }
          },
        },
      ]
    );
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleHelp = () => {
    navigation.navigate("UserGuideScreen");
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../Assets/Stretch3.png")}
          style={frontScreenStyles.container}
          resizeMode="cover"
        >
          <View style={frontScreenStyles.container}>
            <TouchableOpacity
              onPress={handleHelp}
              style={frontScreenStyles.helpButton}
            >
              <Icon
                name="help-circle"
                size={24}
                color={theme.colors.helpButton}
              />
            </TouchableOpacity>

            <View style={frontScreenStyles.loginContainer}>
              <Image
                source={require("../Assets/Logo.png")}
                style={frontScreenStyles.logo}
              />
              <Text style={frontScreenStyles.titleText}>FysioGO!</Text>
              <Text style={frontScreenStyles.loginText}>Logg inn</Text>

              <InputField
                style={frontScreenStyles.input}
                placeholder="Epost"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <InputField
                style={frontScreenStyles.input}
                placeholder="Passord"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />

              <CustomButton title="Logg inn" onPress={handleLogin} />

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={frontScreenStyles.linkText}>Glemt passord?</Text>
              </TouchableOpacity>

              <Text style={frontScreenStyles.registerText}>
                Ikke medlem?{" "}
                <Text
                  style={frontScreenStyles.registerLinkText}
                  onPress={handleRegister}
                >
                  Registrer deg her
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

export default FrontScreen;

// Her ligger opprinnelig fungerende kode, men uten mulighet til reeset av passord. Kikk på pilen for å åpne hele koden
// import React, { useState } from "react";
// import {
//   Alert,
//   Image,
//   View,
//   Text,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ImageBackground,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../Navigation/navigationTypes";
// import CustomButton from "../Components/CustomButton/CustomButton";
// import { InputField } from "../Components/CustomInput/CustomInput";
// import { theme } from "../theme";
// import { frontScreenStyles } from "../Styles/FrontScreen_Style";
// import { useUser } from "../Context/UserContext";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { FirebaseError } from "@firebase/util";
// import {
//   auth,
//   fetchUserDetailsFromFirestore,
// } from "../Services/Firebase/firebaseConfig";

// type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

// const FrontScreen = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const { dispatch } = useUser();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string>("");

//   const handleLogin = async () => {
//     if (!email.trim()) {
//       setError("E-post er påkrevd.");
//       Alert.alert("Feil", "E-post er påkrevd.");
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Ugyldig e-postadresse.");
//       Alert.alert("Feil", "Ugyldig e-postadresse.");
//       return;
//     }
//     if (!password) {
//       setError("Passord er påkrevd.");
//       Alert.alert("Feil", "Passord er påkrevd.");
//       return;
//     }
//     setError("");
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       const token = await user.getIdToken();

//       // Hent brukerdetaljer fra Firestore
//       const userDetails = await fetchUserDetailsFromFirestore(user.uid);
//       if (!userDetails) {
//         Alert.alert("Feil", "Kunne ikke hente brukerdetaljer.");
//         return;
//       }

//       dispatch({
//         type: "LOGIN",
//         token,
//         userId: user.uid,
//         userDetails,
//       });

//       navigation.navigate("ProfileScreen", {
//         userName: userDetails.username || "Bruker",
//       });
//     } catch (error) {
//       const firebaseError = error as FirebaseError;
//       setError(firebaseError.message);
//       Alert.alert("Feil ved innlogging", firebaseError.message);
//     }
//   };

//   const handleRegister = () => {
//     navigation.navigate("Register");
//   };

//   const handleHelp = () => {
//     navigation.navigate("UserGuideScreen");
//   };

//   const handleAboutPress = () => {
//     navigation.navigate("AboutScreen");
//   };

//   const handleContactPress = () => {
//     navigation.navigate("ContactScreen");
//   };

//   return (
//     <>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ImageBackground
//           source={require("../Assets/Stretch3.png")}
//           style={frontScreenStyles.container}
//           resizeMode="cover"
//         >
//           <View style={frontScreenStyles.container}>
//             <TouchableOpacity
//               onPress={handleHelp}
//               style={frontScreenStyles.helpButton}
//             >
//               <Icon
//                 name="help-circle"
//                 size={24}
//                 color={theme.colors.helpButton}
//               />
//             </TouchableOpacity>

//             <View style={frontScreenStyles.loginContainer}>
//               <Image
//                 source={require("../Assets/Logo.png")}
//                 style={frontScreenStyles.logo}
//               />
//               <Text style={frontScreenStyles.titleText}>FysioGO!</Text>
//               <Text style={frontScreenStyles.loginText}>Logg inn</Text>

//               <InputField
//                 style={frontScreenStyles.input}
//                 placeholder="Epost"
//                 value={email}
//                 onChangeText={setEmail}
//                 autoCapitalize="none"
//                 keyboardType="email-address"
//               />
//               {error && (
//                 <Text style={frontScreenStyles.errorText}>{error}</Text>
//               )}

//               <InputField
//                 style={frontScreenStyles.input}
//                 placeholder="Passord"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//                 autoCapitalize="none"
//               />

//               <CustomButton
//                 title="Logg inn"
//                 onPress={handleLogin}
//                 iconName="login"
//                 buttonStyle={frontScreenStyles.button}
//               />

//               <Text style={frontScreenStyles.registerText}>
//                 Ikke medlem?{" "}
//                 <Text
//                   style={frontScreenStyles.registerLinkText}
//                   onPress={handleRegister}
//                 >
//                   Registrer deg her
//                 </Text>
//               </Text>
//             </View>
//           </View>
//         </ImageBackground>
//       </KeyboardAvoidingView>
//       <View style={frontScreenStyles.bottomLinksContainer}>
//         <TouchableOpacity onPress={handleAboutPress}>
//           <Text style={frontScreenStyles.bottomLinkText}>Om oss</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleContactPress}>
//           <Text style={frontScreenStyles.bottomLinkText}>Kontakt oss</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// export default FrontScreen;
