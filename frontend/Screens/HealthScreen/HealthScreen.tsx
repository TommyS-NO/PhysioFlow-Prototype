import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HealthScreen: React.FC = () => {
    const navigation = useNavigation();

    return( 
        <View style={styles.container}>

        <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("FocusScreen")}
    >
        <Text style={styles.menuText}>Endre fokusområder</Text>
    </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    menuItem: {
      backgroundColor: '#26807C', 
      padding: 15, 
      margin: 10,
      borderRadius: 5,
      width: '95%', 
      alignItems: 'center', 
    },
    menuText: {
      color: 'white', 
      fontSize: 16, 
    },
  });




export default HealthScreen;