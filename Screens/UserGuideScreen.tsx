import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserGuideScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Brukerveiledning Under utvikling</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default UserGuideScreen;
