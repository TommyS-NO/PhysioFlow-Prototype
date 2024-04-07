import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedWorkoutsScreen: React.FC = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const existingSessions = await AsyncStorage.getItem('workoutSessions');
        setSessions(existingSessions ? JSON.parse(existingSessions) : []);
      } catch (error) {
        Alert.alert("Feil", "Kunne ikke hente treningsøkter.");
      }
    };

    fetchSessions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.sessionItem}>
            <Text style={styles.sessionDate}>{new Date(item.date).toLocaleDateString()}</Text>
            {item.exercises.map((exercise, index) => (
              <Text key={index} style={styles.exerciseText}>
                Øvelse: {exercise.title}, Smerte: {exercise.painLevel}, Innsats: {exercise.effortLevel}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

//Denne er ikke stylet enda

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sessionItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseText: {
    fontSize: 14,
  },
});

export default CompletedWorkoutsScreen;
