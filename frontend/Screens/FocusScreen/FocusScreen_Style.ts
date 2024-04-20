import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  content: { flexGrow: 1, paddingTop: 20 },
  questionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    padding: 10,
  },
  questionText: { fontSize: 14, color: "#333" },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    margin: 2,
    backgroundColor: "#dddddd",
  },
  selectedOption: { backgroundColor: "green" },
  optionText: { fontSize: 12, color: "black", textAlign: "center" },
  modalView: {
    marginHorizontal: 20,
    marginTop: "10%",
    marginBottom: "10%",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    maxHeight: "80%",
  },
  diagnosisTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  diagnosisText: { fontSize: 16, marginTop: 10, marginBottom: 20 },
  exerciseDetailContainer: { marginBottom: 20 },
  exerciseTitle: { fontSize: 18, fontWeight: "bold" },
  exerciseDescription: { fontSize: 14, marginVertical: 10 },
  exerciseImage: { width: 250, height: 150, resizeMode: "contain" },
});