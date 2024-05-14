import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { InputField } from "../../Components/CustomInput/CustomInput";
import { theme } from "../../theme";
import { frontScreenStyles } from "./FrontScreen_Style";
import { useUser } from "../../Context/UserContext";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  auth,
  fetchUserDetailsFromFirestore,
} from "../../Services/Firebase/FirebaseConfig";

const isFirebaseError = (error: unknown): error is FirebaseError => {
  return (error as FirebaseError).message !== undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Front">;

const FrontScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { dispatch } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
const [contactModalVisible, setContactModalVisible] = useState(false);


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
      const { userProfile} =
        await fetchUserDetailsFromFirestore(user.uid);

      if (!userProfile) {
        Alert.alert("Feil", "Kunne ikke hente brukerdetaljer.");
        return;
      }

      dispatch({
        type: "LOGIN",
        token,
        userId: user.uid,
        userDetails: userProfile,
     
      });

      setEmail("");
      setPassword("");
      navigation.navigate("ProfileScreen", {
        userName: userProfile.username || "Bruker",
      });
    } catch (error) {
      if (isFirebaseError(error)) {
        setError(error.message);
        Alert.alert(
          "Feil ved innlogging",
          "Du har tastet feil brukernavn eller passord."
        );
      } else {
        Alert.alert("Feil ved innlogging", "En ukjent feil oppsto.");
      }
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
      `Vil du sende en e-post for å tilbakestille passordet til: ${email}?`,
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
              if (error instanceof Error) {
                Alert.alert("Feil", error.message);
              } else {
                Alert.alert("Feil", "En ukjent feil oppsto.");
              }
            }
          },
        },
      ]
    );
  };

  const handleAboutPress = () => {
	setAboutModalVisible(true);
  };
  
  const handleContactPress = () => {
	setContactModalVisible(true);
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleHelp = () => {
    setModalVisible(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../../Assets/Stretch3.png")}
		  accessibilityLabel="Stretching person"
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

            <CustomModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              title="Velkommen til PhysoFlow!"
              containerStyle={{ width: 350, height: 600 }}
            >
              <ScrollView>
                <Text style={frontScreenStyles.heading}>
                  Oppsett av fokusområder
                </Text>
                <Text style={frontScreenStyles.text}>
                  1. Identifiser dine smerteområder: Start med å velge områder
                  på kroppen hvor du opplever smerte eller ubehag.
                </Text>
                <Text style={frontScreenStyles.text}>
                  2. Tilpasning: Basert på dine valg, tilpasser PhysioFlow et
                  tøye og rehabiliteringsprogram spesielt utformet for å
                  målrette dine fokusområder og lindre smerte.
                </Text>

                <Text style={frontScreenStyles.heading}>
                  Utføre tøyeøvelser
                </Text>

                <Text style={frontScreenStyles.text}>
                  - Instruksjoner og videoer: Sørg for riktig utførelse ved å
                  følge detaljerte instruksjoner og animasjoner.
                </Text>
                <Image
                  source={require("../../Assets/StretchMale.png")}
                  style={frontScreenStyles.modalImage}
				  accessibilityLabel="Stretching male"
				
                />
                <Text style={frontScreenStyles.heading}>
                  Registrering av treningsøkter
                </Text>
                <Text style={frontScreenStyles.text}>
                  - Loggfør økter: Etter hver treningsøkt, kan du registrere
                  detaljer som øvelser utført, varighet, og personlige notater
                  om din opplevelse.
                </Text>
                <Text style={frontScreenStyles.text}>
                  - Spor fremgang: Følg med på din treningshistorikk og analyser
                  din fremgang gjennom intuitive rapporter og analyser.
                </Text>

                <Text style={frontScreenStyles.heading}>
                  Kontakt din behandler
                </Text>
                <Text style={frontScreenStyles.text}>
                  - Meldingstjeneste: PhysioFlow sin innebygde meldingstjeneste
                  lar deg enkelt kommunisere med din behandler for rådgivning
                  eller veiledning.
                </Text>
                <Text style={frontScreenStyles.text}>
                  - Del din fremgang: Med din tillatelse, kan du dele
                  treningslogger og fremgangsrapporter med din behandler for
                  tilpasset veiledning.
                </Text>

                <Text style={frontScreenStyles.heading}>Ekstra funksjoner</Text>

                <Text style={frontScreenStyles.text}>
                  - Justering av program: Du kan når som helst justere ditt
                  øvelsesprogram basert på endringer i dine fokusområder eller
                  ut fra din helsetilstand.
                </Text>
              </ScrollView>
            </CustomModal>

            <View style={frontScreenStyles.loginContainer}>
              <Text style={frontScreenStyles.titleText}>PhysioFlow</Text>
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
                <Text style={frontScreenStyles.passwordLinkText}>
                  Glemt passord?
                </Text>
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
			  <CustomModal
            visible={aboutModalVisible}
            onClose={() => setAboutModalVisible(false)}
            title="Physio Flow"
			containerStyle={{ width: 350, height: 600 }}
          >
			<ScrollView>
			<Text style={frontScreenStyles.text}>
            Velkommen til PhysioFlow - din digitale partner for fysioterapi og
            rehabilitering, når og hvor det passer deg.{" "}
          </Text>
          <Text style={frontScreenStyles.text}>
            Ved å kombinere det nyeste innen kunstig intelligens (AI) med
            ekspertisen til vårt team av fysioterapeuter, har vi skapt en unik
            plattform designet for å gi deg personlig tilpasset veiledning og
            støtte gjennom din rehabiliteringsreise.
          </Text>
          <Image
            source={require("../../Assets/Robot.png")}
            style={frontScreenStyles.modalImage}
			accessibilityLabel="Robot"
          />
          <Text style={frontScreenStyles.heading}>Vår visjon</Text>
          <Text style={frontScreenStyles.text}>
            I en verden hvor tilgangen til helsehjelp stadig utfordres av både
            tid og sted, er vår visjon å bringe fysioterapien hjem til deg.
            PhysioFlow ble grunnlagt med en formening om at alle fortjener
            tilgang til kvalitetsmessig fysioterapi, uavhengig av hvor de
            befinner seg.
          </Text>
          <Text style={frontScreenStyles.heading}>Hvordan PhysioFlow fungerer</Text>
          <Text style={frontScreenStyles.bulletPoints}>Personlig tilpasning:</Text>
          <Text style={frontScreenStyles.text}>
            Når du laster ned PhysioFlow-appen og oppretter din profil, blir du
            bedt om å dele informasjon om din fysiske tilstand, dine mål og
            eventuelle smerter eller skader. Denne informasjonen danner
            grunnlaget for din personlige rehabiliteringsplan.
          </Text>

          <Text style={frontScreenStyles.bulletPoints}>
            Tilgjengelighet og fleksibilitet:
          </Text>
          <Text style={frontScreenStyles.text}>
            Med PhysioFlow i lommen, har du tilgang til fysioterapi døgnet
            rundt, uten behov for å tilpasse deg tidsskjemaer eller reise til en
            klinikk. Enten du er hjemme, på jobb, eller på reise, gir vi deg
            verktøyene du trenger for å jobbe mot bedre helse.
          </Text>
          <Image
            source={require("../../Assets/StretchOldMale.png")}
            style={frontScreenStyles.modalImage}
			accessibilityLabel="Stretching male old"
          />
          <Text style={frontScreenStyles.bulletPoints}>Din digitale fysioterapeut:</Text>
          <Text style={frontScreenStyles.text}>
            Gjennom appen vil du motta daglige treningsplaner,
            instruksjonsvideoer og oppfølgingsverktøy som hjelper deg å holde
            deg på sporet. AI-teknologien muliggjør også tilpasning av
            programmet ditt over tid basert på din progresjon og eventuelle
            tilbakemeldinger du gir.
          </Text>

          <Text style={frontScreenStyles.heading}>Vårt team</Text>
          <Text style={frontScreenStyles.text}>
            Bak PhysioFlow står et dedikert team av fysioterapeuter,
            dataforskere og teknologientusiaster, alle med et felles mål om å
            gjøre rehabilitering så tilgjengelig og effektiv som mulig. Vi er
            stolte av å kunne tilby en tjeneste som ikke bare leder an i
            teknologisk innovasjon, men som også er dypt forankret i
            profesjonell fysioterapipraksis.
          </Text>
          <Image
            source={require("../../Assets/Our_team.png")}
            style={frontScreenStyles.modalImage}
			accessibilityLabel="Our team"
          />
			</ScrollView>
          </CustomModal>

          <CustomModal
            visible={contactModalVisible}
            onClose={() => setContactModalVisible(false)}
            title="Kontakt oss"
			containerStyle={{ width: 350, height: 600 }}
          >
		
			<ScrollView>
            <Text style={frontScreenStyles.heading}>Kontakt oss gjerne for ytterligere informasjon:</Text>

			<Text style={frontScreenStyles.bulletPoints}>
  <Text style={frontScreenStyles.boldText}>Telefon:</Text> 123-456-7890
</Text>
<Text style={frontScreenStyles.bulletPoints}>
  <Text style={frontScreenStyles.boldText}>E-post:</Text> contact@example.com
</Text>
<Text style={frontScreenStyles.bulletPoints}>
  <Text style={frontScreenStyles.boldText}>Adresse:</Text> Eksempelveien 123, 0123 Sted
</Text>

	<Image
            source={require("../../Assets/Telephone.png")}
            style={frontScreenStyles.modalImage}
			accessibilityLabel="Person on the phone"
          />
			</ScrollView>
          </CustomModal>

              <View style={frontScreenStyles.linkContainer}>
                <Text
                  onPress={handleAboutPress}
                  style={frontScreenStyles.linkText}
                >
                  Om oss
                </Text>
                <Text
                  onPress={handleContactPress}
                  style={frontScreenStyles.linkText}
                >
                  Kontakt oss
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

export default FrontScreen;
