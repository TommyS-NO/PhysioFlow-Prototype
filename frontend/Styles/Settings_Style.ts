import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "#f0f0f0",
    backgroundColor: theme.colors.primary,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editButton: {
    marginLeft: 5,
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    elevation: 2,
  },
  editText: {
    color: "#000",
    fontSize: 14,
  },
  menuContainer: {
    alignSelf: "stretch",
    marginHorizontal: 24,
    marginTop: 24,
  },
  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  menuText: {
    fontSize: 18,
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
    // alignSelf: 'center', Tror ikke vi trenger disse to, men er usikker på om det trengs til Android?
    // alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 1,
  },
  fieldInput: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    marginRight: 12,
  },
  fieldLabel: {
    fontSize: 18,
    color: "#000",
    marginRight: 12,
  },
  fieldIcon: {
    padding: 10,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    color: "#A0A0A0", // Faded text color for non-editable fields
  },
  editingIcons: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between",
    marginLeft: 10,
  },
});
