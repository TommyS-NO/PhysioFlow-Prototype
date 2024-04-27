import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },


  scrollContentContainer: {
    // flexGrow: 1,
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
    marginTop: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 15,
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
    marginVertical: theme.spacing.small,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    width: 120, 
    marginHorizontal: 10, 
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
