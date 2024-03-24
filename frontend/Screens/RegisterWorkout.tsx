import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomSlider from "../Components/CustomSlider/CustomSlider";
import CustomButton from "../Components/CustomButton/CustomButton";
import CustomModal from "../Components/CustomModal/CustomModal";
import { EXERCISE_SESSIONS } from "./ExerciseOverviewScreen";

const RegisterWorkout: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [painLevel, setPainLevel] = useState(5);
  const [effortLevel, setEffortLevel] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [registeredExercises, setRegisteredExercises] = useState([]);

  const handleRegisterExercise = () => {
    setRegisteredExercises([
      ...registeredExercises,
      { ...selectedExercise, painLevel, effortLevel },
    ]);
    setIsCustomModalVisible(false); 
  };

  const handleFinalRegister = () => {
    // Logikk for å lagre alle øvelsene i Firebase/skyløsning?
    Alert.alert(
      "Treningsøkt registrert",
      `Antall øvelser: ${registeredExercises.length}`
    );
  };

  const openExerciseCustomModal = (exercise) => {
    setSelectedExercise(exercise);
    setPainLevel(5); 
    setEffortLevel(5);
    setIsCustomModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.datePickerText}>
        Velg ønsket dato for registrering av treningsøkt
      </Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          setDate(selectedDate || date);
        }}
      />
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
      <CustomModal
        animationType="slide"
        transparent={true}
        visible={isCustomModalVisible}
        onRequestClose={() => {
          //Hvorfor er denne rød? Hva er det den ikke fanger opp?
          setIsCustomModalVisible(false);
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
  },
  datePickerText:{    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,},

  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  exerciseText: {
    fontSize: 16,
  },
  CustomModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  CustomModalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  CustomModalContent: {
    alignItems: 'center',
    justifyContent: 'center',
},
input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',  },
});

export default RegisterWorkout;
