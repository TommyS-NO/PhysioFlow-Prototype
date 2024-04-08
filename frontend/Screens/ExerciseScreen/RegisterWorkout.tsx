// import React, { useState, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   Alert,
//   TouchableOpacity,
//   FlatList,
//   Keyboard,
// } from "react-native";
// import CustomSlider from "../../Components/CustomSlider/CustomSlider";
// import CustomButton from "../../Components/CustomButton/CustomButton";
// import CustomModal from "../../Components/CustomModal/CustomModal";
// import { EXERCISE_SESSIONS } from "../ExerciseOverviewScreen";
// // import { theme } from "../Theme";

// const RegisterWorkout: React.FC = () => {
//   const [selectedExercise, setSelectedExercise] = useState(null);
//   const [painLevel, setPainLevel] = useState(5);
//   const [effortLevel, setEffortLevel] = useState(5);
//   const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
//   const [registeredExercises, setRegisteredExercises] = useState([]);
//   const [repetitions, setRepetitions] = useState("");
//   const [sets, setSets] = useState("");
//   const repetitionsRef = useRef(null);
//   const setsRef = useRef(null);

//   const handleRegisterExercise = () => {
//     setRegisteredExercises([
//       ...registeredExercises,
//       {
//         ...selectedExercise,
//         painLevel,
//         effortLevel,
//         repetitions: parseInt(repetitions, 10),
//         sets: parseInt(sets, 10),
//       },
//     ]);
//     setRepetitions("");
//     setSets("");
//     setIsCustomModalVisible(false);
//   };

//   //Oppsett for å fjerne valgt øvelse:

//   const handleRemoveExercise = (index: number) => {
//     setRegisteredExercises((currentExercises) =>
//       currentExercises.filter((_, itemIndex) => itemIndex !== index)
//     );
//   };

//   const handleFinalRegister = () => {
//     if (registeredExercises.length === 0) {
//       Alert.alert(
//         "Ingen øvelser valgt",
//         "Du må legge til minst én øvelse før du kan registrere økten."
//       );
//     } else {
//       // Her må vi legge til logikk for å legge til data i Firebase!
//       Alert.alert(
//         "Treningsøkt registrert",
//         `Antall øvelser: ${registeredExercises.length}`
//       );
//     }
//   };

//   const openExerciseCustomModal = (exercise) => {
//     setSelectedExercise(exercise);
//     setPainLevel(5);
//     setEffortLevel(5);
//     setIsCustomModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={EXERCISE_SESSIONS}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => openExerciseCustomModal(item)}
//             style={styles.exerciseItem}
//           >
//             <Text style={styles.exerciseText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <Text style={styles.registeredExercisesTitle}>Valgte Øvelser:</Text>
//       <FlatList
//         data={registeredExercises}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.registeredExerciseItem}>
//             <Text style={styles.registeredExerciseText}>
//               {item.title}, Smerte: {item.painLevel}, Innsats:{" "}
//               {item.effortLevel}
//             </Text>
//             <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
//               <Text style={styles.removeButtonText}>Fjern øvelse</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       <CustomModal
//         animationType="slide"
//         transparent={true}
//         visible={isCustomModalVisible}
//         onClose={() => {
//           //Denne finnes ikke på siden? Må det kobles opp på noen måte?
//           return setIsCustomModalVisible(false);
//         }}
//         onClose={() => {
//           setIsCustomModalVisible(false);
//         }}
//       >
//         <View style={styles.CustomModalView}>
//           {selectedExercise && (
//             <>
//               <Text style={styles.CustomModalText}>
//                 {selectedExercise.title}
//               </Text>
//               <CustomSlider
//                 title="Smertenivå"
//                 value={painLevel}
//                 onValueChange={setPainLevel}
//               />
//               <CustomSlider
//                 title="Intensitetsnivå"
//                 value={effortLevel}
//                 onValueChange={setEffortLevel}
//               />

//               <CustomButton
//                 title="Legg til øvelse"
//                 onPress={handleRegisterExercise}
//               />
//             </>
//           )}
//         </View>
//       </CustomModal>
//       <CustomButton title="Registrer økt" onPress={handleFinalRegister} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // backgroundColor: 'rgba(38, 128, 124, 0.2)',
//   },
//   datePickerText: { marginBottom: 15, textAlign: "center", fontSize: 18 },

//   exerciseItem: {
//     backgroundColor: "rgba(38, 128, 124, 0.2)",
//     padding: 15,
//     marginVertical: 8,
//     flexDirection: "row", // For å sette tekst og bilde/ikon på samme linje hvis vi tar med bilde?
//     alignItems: "center",
//     borderRadius: 10,
//     shadowColor: "#000",
//   },
//   exerciseText: {
//     fontSize: 16,
//   },

//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     width: "80%",
//     marginBottom: 10,
//   },
//   removeButtonText: {
//     color: "red",
//   },

//   registeredExercisesTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   registeredExerciseItem: {
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   registeredExerciseText: {
//     fontSize: 16,
//   },
// });

// export default RegisterWorkout;

import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { EXERCISE_SESSIONS } from "../ExerciseOverviewScreen";
import { theme } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterWorkout: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [painLevel, setPainLevel] = useState(5);
  const [effortLevel, setEffortLevel] = useState(5);
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [registeredExercises, setRegisteredExercises] = useState([]);
  const [repetitions, setRepetitions] = useState('');
  const [sets, setSets] = useState('');
  const repetitionsRef = useRef(null);
  const setsRef = useRef(null);


const handleRegisterExercise = () => {
    if (repetitions.trim() === "" || sets.trim() === "") {
      Alert.alert("Feil", "Du må fylle ut antall repetisjoner og sett.");
      return;
    }
    const newExercise = {
      ...selectedExercise,
      painLevel,
      effortLevel,
      repetitions: parseInt(repetitions, 10),
      sets: parseInt(sets, 10),
    };
    setRegisteredExercises([...registeredExercises, newExercise]);
    setIsCustomModalVisible(false);
    clearInputs();
  };

  const clearInputs = () => {
    setRepetitions("");
    setSets("");
    Keyboard.dismiss();
  };

  //Oppsett for å fjerne valgt øvelse:

  const handleRemoveExercise = (index: number) => {
    setRegisteredExercises((currentExercises) =>
      currentExercises.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleFinalRegister = async () => {
    if (registeredExercises.length === 0) {
      Alert.alert(
        "Ingen øvelser valgt",
        "Du må legge til minst én øvelse før du kan registrere økten."
      );
    } else {
      // Her må vi legge til logikk for å legge til data i Firebase!
	  await saveWorkoutSession(); 
      Alert.alert(
        "Treningsøkt registrert",
        `Antall øvelser: ${registeredExercises.length}`
      );
	  setRegisteredExercises([]);
    }
  };

  const openExerciseCustomModal = (exercise) => {
    setSelectedExercise(exercise);
    setPainLevel(5);
    setEffortLevel(5);
    setIsCustomModalVisible(true);
  };

  const saveWorkoutSession = async () => {
	const newSession = {
	  date: new Date().toISOString(),
	  exercises: registeredExercises,
	};
  
	try {
	  const existingSessions = await AsyncStorage.getItem('workoutSessions');
	  const sessions = existingSessions ? JSON.parse(existingSessions) : [];
	  sessions.push(newSession);
  
	  await AsyncStorage.setItem('workoutSessions', JSON.stringify(sessions));
	//   Alert.alert("Treningsøkt registrert", "Din treningsøkt er lagret.");
	} catch (error) {
	  Alert.alert("Feil", "Kunne ikke lagre treningsøkten.");
	}
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
              {item.title}, Smertenivå: {item.painLevel}, Intensitetsnivå: {item.effortLevel}, Sett: {item.sets}, Repetisjoner: {item.repetitions}
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
    
		onClose={() => {
			setIsCustomModalVisible(false);
			clearInputs();
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
			      <View style={styles.inputContainer}>
			       <TextInput
            style={styles.input}
            value={repetitions}
            onChangeText={setRepetitions}
            placeholder="Reps"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => setsRef.current?.focus()}
            blurOnSubmit={false}
            ref={repetitionsRef}
          />
          <TextInput
            style={styles.input}
            value={sets}
            onChangeText={setSets}
            placeholder="Sett"
            keyboardType="numeric"
            returnKeyType="done"
            ref={setsRef}
            onSubmitEditing={handleRegisterExercise}
          />
</View>
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
    backgroundColor: "rgba(38, 128, 124, 0.2)",
    padding: 15,
    marginVertical: 8,
    flexDirection: "row", // For å sette tekst og bilde/ikon på samme linje hvis vi tar med bilde?
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
  },
  exerciseText: {
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
	marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontWeight: 'bold', 
    fontSize: 16, 


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
