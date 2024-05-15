import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,

  },
  welcomeImage: {
    width: 280,  
    height: 200,
    marginTop:20,  
borderRadius: 8,

  },

  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
marginBottom: 20,
    textAlign: "center",
    color: theme.colors.text,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  infoText: {
    fontSize: 18,
  
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    margin: 30,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0, 
    },
    shadowOpacity: 0.23, 
    shadowRadius: 4.65, 
    elevation: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxLabel: {
    fontSize: theme.fontSize.regular,
  },

  input: {
    height: 40,
    width: "100%",
    borderColor: "#cccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: theme.spacing.small,
  },

nextButtonStyle: {
  width: 120,
},
  button: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  flexibleButton: {
    width: 'auto', 
    paddingHorizontal: 10,

  },
});
