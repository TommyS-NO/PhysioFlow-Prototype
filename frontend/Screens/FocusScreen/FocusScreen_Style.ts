import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  content: { flexGrow: 1, paddingTop: 20 },
  questionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    padding: 10,
    marginBottom: 20,
    

  },
  questionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },

  optionButton: {
    padding: 15,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#dddddd",
    flex: 1,
    marginHorizontal: 10,
  },

  selectedOption: {
    backgroundColor: "#26807C",
  },
  selectedOptionText: {
    color: "white",
  },
  optionText: { fontSize: 14, color: "black", textAlign: "center" },
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
    maxHeight: "85%",
  },
  diagnosisTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 },
  diagnosisText: { fontSize: 16, marginTop: 10, marginBottom: 20 },
  exerciseDetailContainer: { marginBottom: 20 },
  exerciseTitle: { fontSize: 18, fontWeight: "bold" },
  exerciseDescription: { fontSize: 14, marginVertical: 10 },
  exerciseImage: { width: 250, height: 150, resizeMode: "contain" },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },

  horizontalOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  unansweredQuestion: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff0f0", 
    marginVertical: 5,

  },

  modalHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageInfo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  
});
