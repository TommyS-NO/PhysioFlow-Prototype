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

import { styles } from "../Styles/ProfileScreen_Style";
import { RootStackParamList } from "../Navigation/navigationTypes";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

const ProfileScreen: React.FC = () => {
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
    navigation.navigate("UserGuideScreen");
  };

  return (
    // Husk å fjerne scrollview ettersom vi ikke skal benytte dette

    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleHelp} style={styles.helpButton}>
          <Icon name="help-circle" size={24} color={theme.colors.helpButton} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Image
            source={require("../Assets/Robot_1.png")}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
        </View>

        <TouchableOpacity
          style={[styles.menuItem, styles.fullWidthButton]}
          onPress={() => navigation.navigate("FocusScreen")}
        >
          <Text style={styles.menuText}>Finn min diagnose 👨🏻‍⚕️</Text>
        </TouchableOpacity>
        <View style={styles.gridContainer}>
          {/* Plasser kolonneknapper her- må legges i par hvis det skal bli riktig */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("ExerciseOverviewScreen")}
          >
            <Text style={styles.menuText}>Mine øvelser</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("ExerciseScreen")}
          >
            <Text style={styles.menuText}>Søk etter øvelser</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.menuItem, styles.fullWidthButton, styles.bobButton]}
          onPress={() => {}}
        >
          <Text style={styles.bobText}>BobAI 🤖</Text>
          {/* <Image
            source={require("../Assets/Robot_2.png")}
            style={styles.bobImage}
          /> */}
        </TouchableOpacity>

        <View style={styles.fullWidthContainer}>
          <TouchableOpacity
            style={[styles.menuItem, styles.fullWidthButton]}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Text style={styles.menuText}>Profilinnstillinger ⚒️</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={[styles.menuItem, styles.fullWidthButton]}
          onPress={() => {}}
        >
          <Text style={styles.menuText}>Send melding til behandler</Text>
        </TouchableOpacity> */}

        {/* Fjerne denne fra forsiden?  */}
        {/* <TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate("HealthScreen")}
				>
					<Text style={styles.menuText}>Helsedata</Text>
				</TouchableOpacity> */}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutButtonText}>Logg ut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
