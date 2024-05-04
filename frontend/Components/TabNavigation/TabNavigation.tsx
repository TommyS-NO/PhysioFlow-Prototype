//Denne fungerer men det mangler koblinger som gjør at ikke navigasjonen fungerer.. 

// import React from 'react';
// import ProfileScreen from '../../Screens/ProfileScreen';
// import SettingsScreen from '../../Screens/SettingsScreen/SettingsScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const Tab = createBottomTabNavigator();

// const TabNavigation: React.FC = () => {
//     return (
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             if (route.name === 'Hjem') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Innstillinger') {
//               iconName = focused ? 'settings' : 'settings-outline';
//             }
//             return <Icon name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#26807C',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="Hjem" component={ProfileScreen} />
//         <Tab.Screen name="Innstillinger" component={SettingsScreen} />
//       </Tab.Navigator>
//     );
//   }
  
//   export default TabNavigation;



//Koblet opp mot App.tsx