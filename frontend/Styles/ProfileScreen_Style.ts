import { StyleSheet } from 'react-native';
import { theme } from "../theme"; //Husk å legge til fra denne 

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
      width: "90%",
      padding: 15,
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      marginVertical: 10,
      borderRadius: 10,
    },
    menuText: {
      fontSize: 18,
    },
    bobContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    bobImage: {
      width: 80,
      height: 120,
    },
    bobText: {
      fontSize: 22,
      marginLeft: 10,
    },
    messageCheckbox: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    messageText: {
      marginLeft: 10,
      fontSize: 18,
    },
    logoutButton: {
      paddingVertical: 15, 
      paddingHorizontal: 30, 
      borderRadius: 10,
      backgroundColor: '#26807C',
      alignSelf: 'stretch', 
      marginHorizontal: 20, 
      marginTop: 20,
      marginBottom: 40, 
    },
    logoutButtonText: {
      fontSize: 18,
      color: '#FFFFFF', 
      textAlign: 'center', 
    },
  
  });
  