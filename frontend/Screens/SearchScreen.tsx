import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchScreen: React.FC = () => {
  return (
    <View>
      <Text style={styles.heading}>Søk etter øvelse</Text>
      <Text style={styles.text}>
        Her kan du søke etter øvelser 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,

    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SearchScreen;
