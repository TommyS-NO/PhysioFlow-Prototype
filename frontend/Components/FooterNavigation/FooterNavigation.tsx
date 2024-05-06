import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FooterNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProfileScreen")}
        style={styles.button}
      >
        <MaterialCommunityIcons name="home" size={24} color="#26807C" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SettingsScreen")}
        style={styles.button}
      >
        <MaterialCommunityIcons name="menu" size={24} color="#26807C" />
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    marginBottom: 15,
  },
});

export default FooterNavigation;
