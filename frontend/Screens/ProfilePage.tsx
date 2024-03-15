import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profilside</Text>
      <View style={styles.profileSection}>
        <Image
          source={require("./path-to-your-image.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.welcomeText}>Velkommen, Bobby!</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mitt profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mine treningsøkter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mitt treningsprogram</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rewardSection}>
        <Text>Reward</Text>
        <Text>Treningsprogresjon</Text>
      </View>

      <View style={styles.bobSection}>
        <Image
          source={require("./path-to-your-robot-image.png")}
          style={styles.bobImage}
        />
        <Text>BobAI</Text>
      </View>

      <TouchableOpacity style={styles.messageCheckbox}>
        <Text>Send melding til din behandler</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logg ut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    margin: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "90%",
    padding: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  rewardSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  bobSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  bobImage: {
    width: 80,
    height: 120,
  },
  messageCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#006400",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
