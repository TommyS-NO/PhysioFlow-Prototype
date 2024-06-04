import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../theme";

const { width } = Dimensions.get("window");
const spacing = 10;

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  settingsButton: {
    position: "absolute",
    top: 10, 
    right: 20,
  },

  fullWidthContainer: {
    alignItems: "center",
    marginBottom: spacing,
  },

  headerContainer: {
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",

  },
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: spacing / 2,
    marginHorizontal: spacing / 2,
    width: (width - spacing * 5) / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  fullWidthButton: {
    width: width - spacing * 4,
  },
  menuText: {
    fontSize: 18,
  },

  profileButton: {
    width: width - spacing * 4,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  profileButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  trainingImage: {
    width: 150,
    height: 150,
    marginLeft: -100,
  },

  bobaiImage: {
    width: 150,
    height: 150,
    marginLeft: 65,
  },
  diagnoseImage: {
    width: 150,
    height: 150,
    marginLeft: 60,
  },
});
