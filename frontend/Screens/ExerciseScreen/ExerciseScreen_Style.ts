import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,

    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sessionItem: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
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
  sessionInfo: {
    flex: 1,
    marginLeft: 10,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sessionDescription: {
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    padding: 10,
    marginRight: 5,
  },
  recommendedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendedLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginLeft: 5,
  },
  feedbackText: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    backgroundColor: "#26807C",
    padding: 10,
    marginHorizontal: 70,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
