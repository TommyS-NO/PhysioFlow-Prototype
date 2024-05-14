import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toggleBodyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 0,
  },
  bodySideText: {
    marginHorizontal: 10,
  fontWeight: "bold",
    fontSize: 16,
  },
  bodyChart: {
    width: 300,
    height: 600,
    resizeMode: "contain",
    marginTop: 20,
  },
  shoulderArea: {
    position: "absolute",
    top: "28%",
    left: "62%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  wristHandArea: {
    position: "absolute",
    top: "50%",
    left: "65%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  hipArea: {
    position: "absolute",
    top: "47%",
    left: "33%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  kneArea: {
    position: "absolute",
    top: "75%",
    left: "56%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  ankleFootArea: {
    position: "absolute",
    top: "88%",
    left: "40%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  upperBackArea: {
    position: "absolute",
    top: "26%",
    left: "48%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  lowerBackArea: {
    position: "absolute",
    top: "40%",
    left: "48%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  elbowArea: {
    position: "absolute",
    top: "42%",
    left: "68%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  neckArea: {
    position: "absolute",
    top: "18%",
    left: "48%",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgba(255,0,0,0.4)",
  },
  modalView: {
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  understoodButton: {
    backgroundColor: '#26807C', 
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  understoodButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});
