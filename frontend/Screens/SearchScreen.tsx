import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Implementer søkelogikk her...
  };

  const handleSearchSubmit = () => {
    console.log("Søker etter:", searchQuery);
    // Her må vi implementere API/innhold så fort vi har det på plass
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Søk etter øvelser..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchSubmit}
        >
          <Text style={styles.searchButtonText}>Søk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SearchScreen;
