import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../theme"; //Husk å legge til fra denne om det skal brukes? 

const { width } = Dimensions.get("window");
const spacing = 10;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidthContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: spacing,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing,
  },

  headerContainer: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  menuItem: {
    backgroundColor: "#FFFFFF",
    padding: spacing,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: spacing / 2,
    width: (width - spacing * 1) / 2,
  
  },
  fullWidthButton: {
    width: width - spacing * 3, 
  },
  menuText: {
    fontSize: 18,
  },
  bobContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  bobButton: {
    flexDirection: "row",

    alignItems: "center",
  },
  bobImage: {
    width: 30, 
    height: 40, 
    resizeMode: "contain", 
  },
  bobText: {
    fontSize: 18,
    marginLeft: 10,
  },

  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#26807C",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  helpButton: {

    position: "absolute",
    right: theme.spacing.medium,
    top: theme.spacing.large,
    padding: theme.spacing.small,
    zIndex: 1,
  },
});
