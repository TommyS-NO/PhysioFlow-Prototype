import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', 
    },
    imageContainer: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginTop: 32, 
      paddingHorizontal: 24, 
    },
    profileImage: {
      width: 100,
      height: 100, 
      borderRadius: 50, 
    },
    editButton: {
      marginLeft: 5, 
    
      backgroundColor: '#fff', 
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 18,
      elevation: 2, 
    },
    editText: {
      color: '#000', 
      fontSize: 14, 
    },
    menuContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 24, 
        marginTop: 24, 
      },
      menuItem: {
        backgroundColor: '#fff', 
        paddingVertical: 16, 
        paddingHorizontal: 24, 
        borderRadius: 8, 
        marginVertical: 8, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 1.5,
      },
      menuText: {
        fontSize: 16, 
        color: '#000', 
      },
      deleteButton: {
        backgroundColor: 'red', 
 
      },
      deleteButtonText: {
        color: '#fff', 

      },
 

  });
  