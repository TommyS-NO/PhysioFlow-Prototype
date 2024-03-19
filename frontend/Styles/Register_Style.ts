import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: theme.colors.primary, 
  },
  infoContent: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.text, 
  },
 
  formContainer: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },


});
