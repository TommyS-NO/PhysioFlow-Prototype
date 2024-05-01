// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const DiagnoseScreen: React.FC = () => {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.text}>Her kommer oppsett for mine diagnoser</Text>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	text: {
// 		fontSize: 20,
// 	},
// });

// export default DiagnoseScreen;

import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SurveyContext } from '../../Context/SurveyContext';

const DiagnoseScreen = () => {
    const { state } = useContext(SurveyContext);
    const { diagnoses } = state;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dine diagnoser</Text>
            {diagnoses && diagnoses.length > 0 ? (
                diagnoses.map((diag, index) => (
                    <View key={index} style={styles.diagnosisContainer}>
                        <Text style={styles.diagnosisTitle}>{diag.title}</Text>
                        <Text style={styles.description}>{diag.description}</Text>
                        <Text style={styles.sectionTitle}>Anbefalte Øvelser</Text>
                        {diag.exercises.map((exercise, idx) => (
                            <Text key={idx} style={styles.exercise}>{exercise}</Text>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={styles.noDiagnosesText}>Ingen diagnoser funnet.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        padding: 8,
        textAlign: 'center',
    },
    diagnosisContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    diagnosisTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    exercise: {
        fontSize: 16,
        color: '#444',
        marginLeft: 10,
    },
    noDiagnosesText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default DiagnoseScreen;
