
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/navigationTypes';

// Anta at denne typen inkluderer alle ruter du vil navigere til
type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

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
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.menuText}>Rediger profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FocusScreen')}>
          <Text style={styles.menuText}>Fokusområder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuText}>Innstillinger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DeleteUserScreen')}>
          <Text style={styles.menuText}>Slett profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50, // Juster etter din statusbar / notch
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    // Legg til flere stiler for lukkeknappen her
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Halvparten av width/height for å gjøre bildet sirkulært
  },
  editButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    // Legg til flere stiler for redigerknappen her
  },
  menuContainer: {
    width: '80%',
    // Legg til stiler for å style menuboksen
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // En lys grå farge for linjen
  },
  menuText: {
    fontSize: 18,
  },
  // Legg til eventuelle ekstra stiler du trenger
});

export default SettingsScreen;
