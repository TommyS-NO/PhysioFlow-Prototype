import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  sessionItem: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sessionImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  sessionImageOverlay: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  sessionInfo: {
    flex: 1,
    marginLeft: 10,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionDescription: {
    fontSize: 16,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeText: {
    fontSize: 16,
    color: 'green',
    marginLeft: 5,
  },
  removeText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 5,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  timeInputLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
       width: '80%', 
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'black', 
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalView: { 
    marginHorizontal: 20,
    marginTop: "5%", 
    marginBottom: "5%",
    paddingHorizontal: 15,
    paddingTop: 30, 
    paddingBottom: 30, 
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%", 
    maxHeight: "85%",
  },
  completedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, 
  },
  completedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center', 
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
