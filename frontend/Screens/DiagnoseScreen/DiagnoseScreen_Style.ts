import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    diagnosisTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    timestamp: {
        fontSize: 14,
        color: '#999',
        marginVertical: 5,
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
