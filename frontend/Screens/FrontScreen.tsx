import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../Components/CustomButton/CustomButton";
import { InputField } from "../Components/CustomInput/CustomInput";
import { theme } from "../theme";
import { frontScreenStyles } from "../Styles/FrontScreen_Style";
import { apiService } from "../Services/APIService";

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

const FrontScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

const handleLogin = async () => {
  try {
    const response = await apiService.login(username, password);
    if (response.message === 'Suksess' && response.data?.token) {
      Alert.alert("Vellykket innlogging", "Du er nå logget inn.");
      navigation.navigate("TBA");
    } else {
      // Feil ved innlogging, viser tilbakemeldingen fra serveren
      Alert.alert("Feil", response.message || "En ukjent feil oppsto.");
    }
  } catch (error) {
    Alert.alert("Feil", "Noe gikk galt med innloggingen. Vennligst prøv igjen.");
    console.error('Login Error:', error);
  }
};


  const handleRegister = () => {
    navigation.navigate("Register", { termsAccepted: true });
  };

  const handleHelp = () => {
    Alert.alert("Brukerveiledning", "Brukerveiledningen er under utvikling.");
  };

  return (
    <ImageBackground
      source={require("../Assets/mountain.jpg")}
      style={frontScreenStyles.container}
    >
      <View style={frontScreenStyles.topContainer}>
        <Image
          source={require("../Assets/logoReact.png")}
          style={frontScreenStyles.logo}
        />
        <Text style={frontScreenStyles.titleText}>Tittel</Text>
      </View>

      <TouchableOpacity
        onPress={handleHelp}
        style={frontScreenStyles.helpButton}
      >
        <Icon name="help-circle" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={frontScreenStyles.loginContainer}>
        <Text style={frontScreenStyles.loginText}>Logg inn</Text>
        <InputField
          style={frontScreenStyles.input}
          placeholder="Epost"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <InputField
          style={frontScreenStyles.input}
          placeholder="Passord"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <CustomButton
          title="Logg inn"
          onPress={handleLogin}
          iconName="login"
          buttonStyle={frontScreenStyles.loginButton}
        />
        <Text style={frontScreenStyles.registerText}>
          Ikke medlem? Registrer deg her
        </Text>
        <CustomButton
          title="Registrer deg"
          onPress={handleRegister}
          iconName="account-plus"
          buttonStyle={frontScreenStyles.registerButton}
        />
      </View>
    </ImageBackground>
  );
};

export default FrontScreen;