import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const frontScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: '100%',
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
    // marginTop: 20,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.h2,
    fontWeight: "bold",
    marginVertical: theme.spacing.small,
  },
  helpButton: {
    marginTop: 50,
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
  errorText: {
    color: theme.colors.secondary,
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
    marginTop: 0,
  },
  registerButton: {
    marginTop: theme.spacing.medium,
  },
  bottomLinksContainer: {
    position: "absolute",
    bottom: theme.spacing.large,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: theme.spacing.large,
  },
  bottomLinkText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.regular,
    padding: theme.spacing.small,
  },
  registerLinkText: {
    color: "black",
    textDecorationLine: "underline",
  },

  linkText: {
    marginTop: 5,
    fontSize: theme.fontSize.regular,
  },
});
