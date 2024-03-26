import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  auth,
  subscribeToUserProfile,
} from "../Services/Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { theme } from "../theme";
import CustomModal from "../Components/CustomModal/CustomModal";
import { styles } from "../Styles/ProfileScreen_Style";
import { RootStackParamList } from "../Navigation/navigationTypes";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

const ProfileScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const navigation = useNavigation<ProfileScreenNavigationProp>();



  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const unsubscribe = subscribeToUserProfile(userId, (data) => {
        setUserName(data.username || "Bruker");
      });
      return () => unsubscribe();
    }
  }, []);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			navigation.navigate("Front");
		} catch (error) {
			Alert.alert("Feil", `Noe gikk galt under utlogging.: ${error.message}`);
		}
	};

  const handleHelp = () => {
		Alert.alert("Brukerveiledning", "Brukerveiledningen er under utvikling.");
	};


  return (
    // Husk å fjerne scrollview ettersom vi ikke skal benytte dette
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../Assets/Robot_1.png")}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
        </View>
        

    
        <View style={styles.fullWidthContainer}>
          <TouchableOpacity
            style={[styles.menuItem, styles.fullWidthButton]}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Text style={styles.menuText}>Profilinnstillinger</Text>
          </TouchableOpacity>
          {/* Denne fjerner vi- kommenterer foreløpig bare ut */}
		  {/* <TouchableOpacity
             style={[styles.menuItem, styles.fullWidthButton]}
            onPress={() => navigation.navigate("ExerciseSession")}
          >
            <Text style={styles.menuText}>Mitt treningsprogram</Text>
          </TouchableOpacity> */}

        </View>


        <View style={styles.gridContainer}>
          {/* Plasser kolonneknapper her- må legges i par hvis det skal bli riktig */}
       
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("RegisterWorkout")}
          >
            <Text style={styles.menuText}>Registrer treningsøkt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Text style={styles.menuText}>Søk etter øvelser</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Utførte treningsøkter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Treningsprogresjon</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={[styles.menuItem, styles.fullWidthButton, styles.bobButton]}
          onPress={() => {
            /* Her må vi legge til funksjonen til BobAI */
          }}
        >
          <Text style={styles.bobText}>BobAI</Text>
          <Image
            source={require("../Assets/Robot_2.png")}
            style={styles.bobImage}
          />
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.menuItem, styles.fullWidthButton]}
          onPress={() => {
            /* Husk å legge inn funksjonen for å sende melding her om vi skal ha med dette?*/
          }}
        >
          <Text style={styles.menuText}>Send melding til din behandler</Text>
        </TouchableOpacity>

        <TouchableOpacity
						onPress={handleHelp}
						style={styles.helpButton}
					>
						<Icon
							name="help-circle"
							size={24}
							color={theme.colors.helpButton}
						/>
					</TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.fullWidthButton]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.menuText}>FAQ</Text>
        </TouchableOpacity>

 
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutButtonText}>Logg ut</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Ofte stilte spørsmål"
        children={
          //Husk å legge til flere punkter og riktig tekst her :)
          <View>
            <Text style={{ marginBottom: 10 }}>
              Hvordan endrer jeg mitt treningsprogram?
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Du kan endre ditt treningsprogram ved å gå til 'Mitt
              treningsprogram' og velge 'Endre'.
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Hvordan kontakter jeg min behandler?
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Du kan sende en melding til din behandler ved å bruke 'Send
              melding til din behandler'-funksjonen i appen.
            </Text>
          </View>
        }
      />
    </ScrollView>
  );
};

export default ProfileScreen;
