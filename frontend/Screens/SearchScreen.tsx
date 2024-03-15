import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import CustomModal from "../Components/CustomModal/CustomModal";
import { EXERCISE_SESSIONS } from "../Screens/ExerciseOverviewScreen";

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSessions, setFilteredSessions] = useState(EXERCISE_SESSIONS);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilteredSessions(EXERCISE_SESSIONS.filter((session) =>
      session.title.toLowerCase().includes(query.toLowerCase())
    ));
  };

  //Hvorfor og hva er feil med session? Koden fungerer greit?  
  const openModal = (session) => {
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddToProgram = () => {
    console.log('Legger til øvelse i program:', selectedSession?.title);
    // Her må vi huske å implementere logikk for å faktisk legge til øvelsene i brukerens treningsprogram
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Søk etter øvelser..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sessionItem} onPress={() => openModal(item)}>
            <Text style={styles.sessionTitle}>{item.title}</Text>
            <Image source={item.image} style={styles.sessionImage} />
          </TouchableOpacity>
        )}
      />
      {selectedSession && (
        <CustomModal
          visible={isModalVisible}
          onClose={closeModal}
          title={selectedSession.title}
          buttons={[
            { title: 'Legg til i treningsprogram', onPress: handleAddToProgram },
            { title: 'Lukk', onPress: closeModal },
          ]}
        >
          <Image source={selectedSession.image} style={styles.modalImage} />
          <Text style={styles.modalText}>{selectedSession.description}</Text>
        </CustomModal>
      )}
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
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sessionTitle: {
    flex: 1,
    fontSize: 18,
  },
  sessionImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SearchScreen;
