import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlignVertical: "top", 
    marginBottom: 20,
    height: 150, 
  },
  iconContainer: {
    position: 'absolute', 
    bottom: -150, 
    left: 0, 
    right: 0, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,

    
  },
  icon: {
    width: 30,
    height: 30,
    color: "#000",
  },
});
