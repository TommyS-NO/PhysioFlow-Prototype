import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { styles } from "../Styles/Settings_Style";

type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SettingsScreen"
>;
//Husk å legge til riktig "" navigeringer til de punktene under som ikke har noen "koblinger"
const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../Assets/Robot_1.png")}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Endre bilde</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditWeight")}
        >
          <Text style={styles.menuText}>Endre vekt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditHeight")}
        >
          <Text style={styles.menuText}>Endre høyde</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditAge")}
        >
          <Text style={styles.menuText}>Endre alder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditGender")}
        >
          <Text style={styles.menuText}>Endre kjønn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FocusScreen")}
        >
          <Text style={styles.menuText}>Endre fokusområder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.deleteButton]}
          onPress={() => navigation.navigate("DeleteUserScreen")}
        >
          <Text style={styles.deleteButtonText}>Slett profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;


