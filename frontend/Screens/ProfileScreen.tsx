import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomModal from "../Components/CustomModal/CustomModal";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../Components/CustomButton/CustomButton"; //Husk å bruke denne eller legg evt. til nye knapper for de ulike sidene
import { RootStackParamList } from "../Navigation/navigationTypes";
import { styles } from "../Styles/ProfileScreen_Style";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

const ProfileScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../Assets/Robot_1.png")}
            style={styles.profileImage}
          />
          <Text style={styles.welcomeText}>Velkommen, [Brukernavn!]!</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Text style={styles.menuText}>Profilinnstillinger</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Mine treningsøkter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Mitt treningsprogram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Reward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Treningsprogresjon</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.bobText}>BobAI</Text>
          <Image
            source={require("../Assets/Robot_2.png")}
            style={styles.bobImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.messageText}>Send melding til din behandler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.messageText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logg ut</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Ofte stilte spørsmål"
        children={
          //Husk å legge til punkter og riktig tekst her
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
