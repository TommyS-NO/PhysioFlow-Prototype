import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { EXERCISE_SESSIONS } from "../ExerciseOverviewScreen";
// import { theme } from "../Theme";

const RegisterWorkout: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [painLevel, setPainLevel] = useState(5);
  const [effortLevel, setEffortLevel] = useState(5);
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [registeredExercises, setRegisteredExercises] = useState([]);

  const handleRegisterExercise = () => {
    setRegisteredExercises([
      ...registeredExercises,
      { ...selectedExercise, painLevel, effortLevel },
    ]);
    setIsCustomModalVisible(false);
  };

  //Oppsett for å fjerne valgt øvelse:

  const handleRemoveExercise = (index: number) => {
    setRegisteredExercises((currentExercises) =>
      currentExercises.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleFinalRegister = () => {
    if (registeredExercises.length === 0) {
      Alert.alert(
        "Ingen øvelser valgt",
        "Du må legge til minst én øvelse før du kan registrere økten."
      );
    } else {
      // Logikk for å lagre alle øvelsene i Firebase/skyløsning
      Alert.alert(
        "Treningsøkt registrert",
        `Antall øvelser: ${registeredExercises.length}`
      );
    }
  };


  const openExerciseCustomModal = (exercise) => {
    setSelectedExercise(exercise);
    setPainLevel(5);
    setEffortLevel(5);
    setIsCustomModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={EXERCISE_SESSIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openExerciseCustomModal(item)}
            style={styles.exerciseItem}
          >
            <Text style={styles.exerciseText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.registeredExercisesTitle}>Valgte Øvelser:</Text>
      <FlatList
        data={registeredExercises}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.registeredExerciseItem}>
            <Text style={styles.registeredExerciseText}>
              {item.title}, Smerte: {item.painLevel}, Innsats:{" "}
              {item.effortLevel}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveExercise(index)}
            >
              <Text style={styles.removeButtonText}>Fjern øvelse</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <CustomModal
        animationType="slide"
        transparent={true}
        visible={isCustomModalVisible}
        onRequestClose={() => {
          //Denne finnes ikke på siden? Må det kobles opp på noen måte?
          return setIsCustomModalVisible(false);
        }}
        onClose={() => {
          setIsCustomModalVisible(false);
        }}
      >
        <View style={styles.CustomModalView}>
          {selectedExercise && (
            <>
              <Text style={styles.CustomModalText}>
                {selectedExercise.title}
              </Text>
              <CustomSlider
                title="Smertenivå"
                value={painLevel}
                onValueChange={setPainLevel}
              />
              <CustomSlider
                title="Intensitetsnivå"
                value={effortLevel}
                onValueChange={setEffortLevel}
              />
              <CustomButton
                title="Legg til øvelse"
                onPress={handleRegisterExercise}
              />
            </>
          )}
        </View>
      </CustomModal>
      <CustomButton title="Registrer økt" onPress={handleFinalRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'rgba(38, 128, 124, 0.2)',
  },
  datePickerText: { marginBottom: 15, textAlign: "center", fontSize: 18 },

  exerciseItem: {
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    backgroundColor: "rgba(38, 128, 124, 0.2)",
    padding: 15,
    marginVertical: 8,
    flexDirection: "row", // For å sette tekst og bilde/ikon på samme linje
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
  },
  exerciseText: {
    fontSize: 16,
  },
  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  removeButtonText: {
	color: "red",
  },

  registeredExercisesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  registeredExerciseItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  registeredExerciseText: {
    fontSize: 16,
  },
});

export default RegisterWorkout;
