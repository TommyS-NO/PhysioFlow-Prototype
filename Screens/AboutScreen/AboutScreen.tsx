// AboutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Om Appen</Text>
      {/* Bare en Test/TOM SIDE*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#26807C', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#1F576C',
  },
});

export default AboutScreen;
