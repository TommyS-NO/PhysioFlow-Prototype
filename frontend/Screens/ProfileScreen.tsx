import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../Styles/ProfileScreen_Style";

const ProfileScreen = () => {
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
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Min profil</Text>
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
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logg ut</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
