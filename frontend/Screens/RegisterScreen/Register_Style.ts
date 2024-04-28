import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  welcomeImage: {
    width: 300,  
    height: 250,  
    resizeMode: 'contain',  
    marginTop: 20,
  },

  scrollContentContainer: {
    // flexGrow: 1, Denne flytter alt i midten av skjermen. Skal vi heller ha den og droppe marginTop i formContainer? 
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
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
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginTop: 50,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxLabel: {
    fontSize: theme.fontSize.regular,
  },

  input: {
    height: 50,
    width: "100%",
    borderColor: "#cccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: theme.spacing.small,
  },
  button: {
    width: 120,
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

// Med modaloppsett..
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   scrollContentContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   infoTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//     color: theme.colors.text,
//   },
//   infoContent: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 20,
//     color: theme.colors.text,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },

//   welcomeTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },

//   welcomeText: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: theme.spacing.small,
//     marginBottom: theme.spacing.small,
//   },
//   checkBoxLabel: {
//     marginLeft: theme.spacing.small,
//     fontSize: theme.fontSize.regular,
//     color: theme.colors.text,
//   },

// });
