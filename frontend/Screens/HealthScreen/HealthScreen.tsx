import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HealthScreen: React.FC = () => {
    const navigation = useNavigation();

    return( 
        <View style={styles.gridContainer}>

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
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    alignItems: 'flex-start', 
    padding: 20, 
    // backgroundColor: 'rgba(38, 128, 124, 0.2)',
  },
    menuItem: {
      backgroundColor: '#26807C', 
      padding: 15, 
      margin: 10,
      borderRadius: 10,
      width: '95%', 
      alignItems: 'center', 
    },
    menuText: {
      color: 'white', 
      fontSize: 16, 
    },
  });


    

export default HealthScreen;