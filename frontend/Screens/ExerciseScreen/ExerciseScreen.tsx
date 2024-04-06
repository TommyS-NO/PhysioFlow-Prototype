import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from "../theme";

const ExerciseScreen: React.FC = () => {
    const navigation = useNavigation();

    return (

        <View style={styles.gridContainer}>
          {/* Plasser kolonneknapper her- må legges i par hvis det skal bli riktig */}

       
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("RegisterWorkout")}
          >
            <Text style={styles.menuText}>Registrer treningsøkt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Text style={styles.menuText}>Søk etter øvelser</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Utførte treningsøkter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Treningsprogresjon</Text>
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
      



    export default ExerciseScreen;