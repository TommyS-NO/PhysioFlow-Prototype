import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      {/*Skal vi legge til Knapper her ? Logg Inn og Register?*/}
      {/*Logo ?*/}
      {/*Innhold*/}
      {/*en Hjelpeknapp?(?)*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#26807C'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D576C'
  }
});

export default HomeScreen;
