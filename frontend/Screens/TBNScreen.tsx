import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, ImageStyle, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/navigationTypes';
import CustomButton from '../Components/CustomButton/CustomButton';

type TBNScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TBNScreen'>;

type FocusArea =
  | 'Hode/Nakke' // Endret 'Nakke' til 'Hode/Nakke' for å matche FocusArea
  | 'Skulder'
  | 'Albue'
  | 'Håndledd/Hånd'
  | 'Øvre rygg'
  | 'Nedre rygg'
  | 'Hofte'
  | 'Kne'
  | 'Ankel/Fot';

const TBNScreen: React.FC = () => {
  const navigation = useNavigation<TBNScreenNavigationProp>();
  const [bodySide, setBodySide] = useState<'front' | 'back'>('front');

  const handleAreaPress = (areaName: FocusArea) => {
    console.log(`User pressed ${areaName}`);
    Alert.alert('Neste trinn er under utvikling');
    // navigation.navigate('RecommendedExercises', { focusArea: areaName });
  };

  const handleToggleBodySide = () => {
    setBodySide(bodySide === 'front' ? 'back' : 'front');
  };

  return (
    <View style={styles.container}>
       <Text>Bodychart Fokusområde</Text> 
      {bodySide === 'front' ? (
        <CustomButton
          onPress={handleToggleBodySide}
          iconName='arrow-right'
          title='Bakside'
          buttonStyle={styles.switchButton}
        />
      ) : (
        <CustomButton
          onPress={handleToggleBodySide}
          iconName='arrow-left'
          title='Forside'
          buttonStyle={styles.switchButton}
        />
      )}
      <Image
        source={bodySide === 'front' ? require('../Assets/bodyChartFront.png') : require('../Assets/bodyChartBack.png')}
        style={styles.bodyChart}
      />
      {bodySide === 'front' ? (
        <>
          {/* Forsiden av bodychartet. Må vi ha både venstre og høyre side? */}
          <TouchableOpacity style={styles.shoulderArea} onPress={() => handleAreaPress('Skulder')} />
          
          <TouchableOpacity style={styles.wristHandArea} onPress={() => handleAreaPress('Håndledd/Hånd')} />
          <TouchableOpacity style={styles.hipArea} onPress={() => handleAreaPress('Hofte')} />
          <TouchableOpacity style={styles.kneArea} onPress={() => handleAreaPress('Kne')} />
          <TouchableOpacity style={styles.ankleFootArea} onPress={() => handleAreaPress('Ankel/Fot')} />
        </>
      ) : (
        <>
          {/* Baksiden av bodychartet */}
          <TouchableOpacity style={styles.upperBackArea} onPress={() => handleAreaPress('Øvre rygg')} />
          <TouchableOpacity style={styles.lowerBackArea} onPress={() => handleAreaPress('Nedre rygg')} />
          <TouchableOpacity style={styles.elbowArea} onPress={() => handleAreaPress('Albue')} />
          <TouchableOpacity style={styles.neckArea} onPress={() => handleAreaPress('Hode/Nakke')} />
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginTop: 50, 
  },
  bodyChart: {
    width: 300,
    height: 600,
    marginTop: 20, 
  },
  switchButton: {
    width: 150,
   backgroundColor: 'rgba(0,0,0,0.3)'
  },
  //Forside!!
   shoulderArea: {
    position: 'absolute',
    top: '25%',  
    left: '27%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  //Bakside!
  elbowArea: {      
    position: 'absolute',
    top: '39%', 
    left: '69%', 
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  //Forside!
  wristHandArea: {
    position: 'absolute',
    top: '47%', 
    left: '73%', 
     width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)', 
  },
  //Bakside!
    upperBackArea: {
    position: 'absolute',
    top: '28%',
    left: '48%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  //Bakside!
  lowerBackArea: {
    position: 'absolute',
    top: '41%',
    left: '48%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  neckArea: {
    position: 'absolute',
    top: '19%',
    left: '48%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  //Forside
    kneArea: {
    position: 'absolute',
    top: '64%',
    left: '54%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
    ankleFootArea: {
    position: 'absolute',
    top: '82%',
    left: '54%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  //forside
    hipArea: {
    position: 'absolute',
    top: '45%',
    left: '57%',
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: 'rgba(255,0,0,0.7)',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
 
});

export default TBNScreen;
