import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { styles } from "../Styles/Settings_Style";

type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

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
          <Text>Endre bilde</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.menuText}>Rediger profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FocusScreen")}
        >
          <Text style={styles.menuText}>Fokusområder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.menuText}>Innstillinger</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("DeleteUserScreen")}
        >
          <Text style={styles.menuText}>Slett profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
