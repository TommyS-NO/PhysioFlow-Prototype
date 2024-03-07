import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";

type TBNScreenNavigationProp = StackNavigationProp<RootStackParamList, "TBNScreen">;

const TBNScreen: React.FC = () => {
  const navigation = useNavigation<TBNScreenNavigationProp>();

  const handleAreaPress = (areaName: string) => {

    console.log(`User pressed ${areaName}`);
    Alert.alert("neste trinn er under utvikling")
   
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
        style={styles.shoulderArea}
        onPress={() => handleAreaPress('Skulder')}
      />
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
    top: '63%', // endrer plassering av touch
    left: '52%',
    width: 30,
    height: 30,
    
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  shoulderArea: {
    position: 'absolute',
    top: '24%', // endre plassering av touch
    left: '28%',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent
  },
});

export default TBNScreen;
