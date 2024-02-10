import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomButton from '../../Components/Button/Button';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Registrer"
        onPress={() => Alert.alert('Registrer Knapp Trykket')}
        iconName="react"
      />
      <CustomButton
        title="Logg Inn"
        onPress={() => Alert.alert('Logg Inn Knapp Trykket')}
        iconName="login"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
