import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50, 
    },
    closeButton: {
      alignSelf: 'flex-end',
      padding: 10,
  
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60, 
    },
    editButton: {
      position: 'absolute',
      right: 10,
      bottom: 10,
     
    },
    menuContainer: {
      width: '80%',
      
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc', 
    },
    menuText: {
      fontSize: 18,
    },
  
  });