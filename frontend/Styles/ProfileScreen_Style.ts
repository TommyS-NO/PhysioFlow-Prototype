import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../theme";

const { width } = Dimensions.get("window");
const spacing = 10;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: theme.colors.primary,
  },
  fullWidthContainer: {
 
    alignItems: "center",
    marginBottom: spacing,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#26807C',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    // marginBottom: 20,
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
  bobContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  bobButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  bobText: {
    fontSize: 18,
    marginLeft: 10,
  },

  helpButton: {
    position: "absolute",
    right: theme.spacing.medium,
    top: theme.spacing.large,
    padding: theme.spacing.small,
    zIndex: 1,
  },
});
