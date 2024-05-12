import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const frontScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    width: "100%",
    height: "100%",
  },
  titleText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.h2,
    fontWeight: "bold",
    marginVertical: theme.spacing.small,
  },
  helpButton: {
    marginTop: 40,
    position: "absolute",
    right: theme.spacing.medium,
    top: theme.spacing.large,
    padding: theme.spacing.small,
    zIndex: 1,
  },
  loginContainer: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    width: "90%",
    alignItems: "center",
    marginTop: 90,
  },
  loginText: {
    fontSize: theme.fontSize.h4,
    marginBottom: theme.spacing.medium,
  },
  registerText: {
    marginTop: theme.spacing.medium,
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

  registerButton: {
    marginTop: theme.spacing.medium,
  },

  registerLinkText: {
    color: "black",
    textDecorationLine: "underline",
  },

  passwordLinkText: {
    marginTop: 5,
    fontSize: theme.fontSize.regular,
  },

  linkText: {
    marginTop: 30,
    fontSize: theme.fontSize.regular,
color: "#26807C",

  },

  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: '100%',
 
  },
});
