import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";

type TBNScreenNavigationProp = StackNavigationProp<RootStackParamList, "TBNScreen">;

const TBNScreen: React.FC = () => {
  const navigation = useNavigation<TBNScreenNavigationProp>();

  const handleAreaPress = (areaName: string) => {
    // Handle the press event for the specific area (e.g., navigate to a details screen)
    console.log(`User pressed ${areaName}`);
    Alert.alert("neste trinn er under utvikling")
    // Navigate to the recommended exercises screen
    // navigation.navigate("RecommendedExercises", { focusArea: areaName });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/bodychart.png')}
        style={styles.bodyChart}
      />
      <TouchableOpacity
        style={styles.kneArea}
        onPress={() => handleAreaPress('Kne')}
      />
      <TouchableOpacity
        style={styles.skulderArea}
        onPress={() => handleAreaPress('Skulder')}
      />
      {/* Add more touchable areas as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyChart: {
    width: 300,
    height: 600,
  },
  kneArea: {
    position: 'absolute',
    top: '62%', // endrer plassering av touch
    left: '50%',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  skulderArea: {
    position: 'absolute',
    top: '24%', // endre plassering av touch
    left: '28%',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent
  },
});

export default TBNScreen;
