
//Denne koden må ryddes opp i! Her er det mye som kan slettes.. 


import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",

  },
  imageContainer: {
    flexDirection: "row",
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
padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  logoutButton: {
    backgroundColor: "#26807C",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
     textAlign: "center",
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
    color: "#000",
  },
  editingIcons: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between",
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000"
  },
  subMenu: {
    
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    marginBottom: 20,
    
  },
  subMenuText: {
    fontSize: 16,
  },

  imageStyle: {
    width: 350, 
    height: 250, 
    marginBottom: 5,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  
});
