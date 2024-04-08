// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CompletedWorkoutsScreen: React.FC = () => {
//   const [sessions, setSessions] = useState([]);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const existingSessions = await AsyncStorage.getItem('workoutSessions');
//         setSessions(existingSessions ? JSON.parse(existingSessions) : []);
//       } catch (error) {
//         Alert.alert("Feil", "Kunne ikke hente treningsøkter.");
//       }
//     };

//     fetchSessions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={sessions}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.sessionItem}>
//             <Text style={styles.sessionDate}>{new Date(item.date).toLocaleDateString()}</Text>
//             {item.exercises.map((exercise, index) => (
//               <Text key={index} style={styles.exerciseText}>
//                 Øvelse: {exercise.title}, Smerte: {exercise.painLevel}, Innsats: {exercise.effortLevel}
//               </Text>
//             ))}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// //Denne er ikke stylet enda

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   sessionItem: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   sessionDate: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   exerciseText: {
//     fontSize: 14,
//   },
// });

// export default CompletedWorkoutsScreen;


//Tester med koden under som foreløpig er litt bedre oppsett

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from "../../Components/CustomModal/CustomModal";

const CompletedWorkoutsScreen = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const storedSessions = await AsyncStorage.getItem('workoutSessions');
      setSessions(storedSessions ? JSON.parse(storedSessions) : []);
    } catch (error) {
      Alert.alert("Feil", "Kunne ikke hente utførte treningsøkter.");
    }
  };

  const handleEditSession = (session) => {
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  const handleRemoveSession = async (sessionDate) => {
    const filteredSessions = sessions.filter(session => session.date !== sessionDate);
    await AsyncStorage.setItem('workoutSessions', JSON.stringify(filteredSessions));
    setSessions(filteredSessions);
    Alert.alert("Suksess", "Økten ble fjernet.");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <View style={styles.sessionItem}>
            <Text style={styles.sessionDate}>{new Date(item.date).toLocaleDateString()}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEditSession(item)} style={styles.editButton}>
                <Text style={styles.buttonText}>Rediger</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveSession(item.date)} style={styles.removeButton}>
                <Text style={styles.buttonText}>Fjern</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <CustomModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} title="Rediger økt">
        {/* Her må vi legge til innhold og logikk for å gjøre endringer av registrerte økter */}
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,

    },
    sessionItem: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#"rgba(38, 128, 124, 0.2)"',
      borderRadius: 5,
    },
    sessionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sessionDate: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    editButton: {
      marginLeft: 10,
      paddingHorizontal: 8,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#26807C', 
    },
    removeButton: {
        marginLeft: 10,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#D32F2F', 
      },

    buttonText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    exerciseText: {
      fontSize: 14,
    },
  });


export default CompletedWorkoutsScreen;
