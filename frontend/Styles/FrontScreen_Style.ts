import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const frontScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
  topContainer: {
    position: "absolute",
    top: theme.spacing.large,
    alignItems: "center",
    width: "100%",
  },
  logo: {
    height: 80,
    width: 80,
    marginTop: 20,
  },
  titleText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.h2,
    fontWeight: "bold",
    marginVertical: theme.spacing.small,
  },
  helpButton: {

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
    // marginTop: theme.spacing.large,
	marginTop:80,
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
  loginButton: {
    marginTop: theme.spacing.medium,
  },
  registerButton: {
    marginTop: theme.spacing.medium,
  },
});
