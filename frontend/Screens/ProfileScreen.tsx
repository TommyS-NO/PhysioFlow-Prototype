import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  auth,
  subscribeToUserProfile,
} from "../Services/Firebase/FirebaseConfig";
import { theme } from "../theme";

import { styles } from "../Styles/ProfileScreen_Style";
import { RootStackParamList } from "../Navigation/navigationTypes";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

const ProfileScreen: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [showTrainingMenu, setShowTrainingMenu] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const unsubscribe = subscribeToUserProfile(userId, (data) => {
        setUserName(data.username || "Bruker");
      });
      return () => unsubscribe();
    }
  }, []);

  const toggleTrainingMenu = () => {
    setShowTrainingMenu(!showTrainingMenu);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            console.log("Navigation object:", navigation);
            navigation.navigate("SettingsScreen");
          }}
        >
          <Icon name="account-cog" size={24} color={theme.colors.helpButton} />
        </TouchableOpacity>
        <View style={styles.fullWidthContainer}>
          <TouchableOpacity
            style={[styles.menuItem, styles.profileButton]}
            onPress={() => navigation.navigate("FocusScreen")}
          >
            <Text style={styles.profileButtonText}>Finn min diagnose</Text>
            <Image
              source={require("../Assets/Welcome.png")}
              style={styles.diagnoseImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.profileButton]}
            onPress={toggleTrainingMenu}
          >
            <Image
              source={require("../Assets/StretchMale.png")}
              style={styles.trainingImage}
            />
            <Text style={styles.profileButtonText}>Trening</Text>
          </TouchableOpacity>

          {showTrainingMenu && (
            <View>
              <TouchableOpacity
                style={[styles.menuItem, styles.fullWidthButton]}
                onPress={() => navigation.navigate("ExerciseOverviewScreen")}
              >
                <Text style={styles.menuText}>Mine øvelser</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.fullWidthButton]}
                onPress={() => navigation.navigate("ExerciseScreen")}
              >
                <Text style={styles.menuText}>Søk etter øvelser</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.fullWidthButton]}
                onPress={() => navigation.navigate("ProgressScreen")}
              >
                <Text style={styles.menuText}>Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.fullWidthButton]}
                onPress={() => navigation.navigate("DiagnoseScreen")}
              >
                <Text style={styles.menuText}>Mine diagnoser</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.menuItem, styles.profileButton]}
            onPress={() => navigation.navigate("ChatScreen")}
          >
            <Text style={styles.profileButtonText}>BobAI Chat</Text>
            <Image
              source={require("../Assets/Robot_1.png")}
              style={styles.bobaiImage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;



//----------------------------------------------------------------
//Tror denne kan slettes.
//Kode med endrede knapper på profilsiden. Her er det mange av knappene som ikke fungerer.

// import React, { useState, useEffect } from "react";
// import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import {
//   auth,
//   subscribeToUserProfile,
// } from "../Services/Firebase/FirebaseConfig";
// import { theme } from "../theme";

// import { styles } from "../Styles/ProfileScreen_Style";
// import { RootStackParamList } from "../Navigation/navigationTypes";

// type ProfileScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "ProfileScreen"
// >;

// const ProfileScreen: React.FC = () => {
//   const [userName, setUserName] = useState("");
//   const navigation = useNavigation<ProfileScreenNavigationProp>();

//   useEffect(() => {
//     const userId = auth.currentUser?.uid;
//     if (userId) {
//       const unsubscribe = subscribeToUserProfile(userId, (data) => {
//         setUserName(data.username || "Bruker");
//       });
//       return () => unsubscribe();
//     }
//   }, []);

//   const handleHelp = () => {
//     navigation.navigate("UserGuideScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1 }}>
//         <TouchableOpacity onPress={handleHelp} style={styles.helpButton}>
//           <Icon name="help-circle" size={24} color={theme.colors.helpButton} />
//         </TouchableOpacity>

//         <View style={styles.headerContainer}>
//           <Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
//         </View>
//         <View style={styles.fullWidthContainer}>
//           <TouchableOpacity
//             style={[styles.menuItem, styles.fullWidthButton]}
//             onPress={() => navigation.navigate("FocusScreen")}
//           >
//             <Text style={styles.menuText}>Finn min diagnose 👨🏻‍⚕️</Text>
//           </TouchableOpacity>

//           {/* Plasser kolonneknapper her- må legges i par hvis det skal bli riktig */}
//           <TouchableOpacity
//             style={[styles.menuItem, styles.fullWidthButton]}
//             onPress={() => navigation.navigate("ExerciseOverviewScreen")}
//           >
//             <Text style={styles.menuText}>Mine øvelser</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.menuItem, styles.fullWidthButton]}
//             onPress={() => navigation.navigate("ExerciseScreen")}
//           >
//             <Text style={styles.menuText}>Søk etter øvelser</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.menuItem, styles.fullWidthButton]}
//             onPress={() => navigation.navigate("ProgressScreen")}
//           >
//             <Text style={styles.menuText}>Progress</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.menuItem, styles.fullWidthButton]}
//             onPress={() => navigation.navigate("DiagnoseScreen")}
//           >
//             <Text style={styles.menuText}>Mine diagnoser</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           style={[styles.menuItem, styles.fullWidthButton]}
//           onPress={() => navigation.navigate("ChatScreen")}
//         >
//           <Text style={styles.bobText}>BobAI 🤖</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.menuItem, styles.fullWidthButton]}
//           onPress={() => navigation.navigate("SettingsScreen")}
//         >
//           <Text style={styles.menuText}>Min profil</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProfileScreen;

//Test med NavBar. Det fungerer men det er mye som også IKKE fungerer.
// import React, { useState, useEffect } from "react";
// import {
// 	View,
// 	Text,
// 	TouchableOpacity,
// 	Image
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { auth, subscribeToUserProfile } from "../Services/Firebase/FirebaseConfig";
// import { theme } from "../theme";
// import { styles } from "../Styles/ProfileScreen_Style";

// // Ekstra imports
// import ExerciseOverviewScreen from "../Screens/ExerciseOverviewScreen/ExerciseOverviewScreen";
// import ExerciseScreen from "../Screens/ExerciseScreen/ExerciseScreen";
// import ProgressScreen from "../Screens/ProgressScreen/ProgressScreen";
// import DiagnoseScreen from "../Screens/DiagnoseScreen/DiagnoseScreen";
// import ChatScreen from "../Screens/ChatScreen/ChatScreen";
// import SettingsScreen from "../Screens/SettingsScreen/SettingsScreen";

// const ProfileScreenNavigationProp = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function ProfileContent() {
// 	const navigation = useNavigation();
// 	const [userName, setUserName] = useState("");

// 	useEffect(() => {
// 		const userId = auth.currentUser?.uid;
// 		if (userId) {
// 			const unsubscribe = subscribeToUserProfile(userId, (data) => {
// 				setUserName(data.username || "Bruker");
// 			});
// 			return () => unsubscribe();
// 		}
// 	}, []);

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<TouchableOpacity onPress={() => navigation.navigate("UserGuideScreen")} style={styles.helpButton}>
// 				<Icon name="help-circle" size={24} color={theme.colors.helpButton} />
// 			</TouchableOpacity>

// 			<View style={styles.headerContainer}>
// 				<Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
// 			</View>

// 			<TouchableOpacity
// 				style={[styles.menuItem, styles.fullWidthButton]}
// 				onPress={() => navigation.navigate("FocusScreen")}
// 			>
// 				<Text style={styles.menuText}>Finn min diagnose 👨🏻‍⚕️</Text>
// 			</TouchableOpacity>
// 		</View>
// 	);
// }

// function TabNavigator() {
// 	return (
// 		<Tab.Navigator screenOptions={({ route }) => ({
// 			tabBarIcon: ({ focused, color, size }) => {
// 				let iconName;
// 				switch (route.name) {
// 					case 'ProfileContent':
// 						iconName = focused ? 'account-circle' : 'account-circle-outline';
// 						break;
// 					case 'SettingsScreen':
// 						iconName = focused ? 'settings' : 'settings-outline';
// 						break;
// 					default:
// 						iconName = 'circle';
// 						break;
// 				}
// 				return <Icon name={iconName} size={size} color={color} />;
// 			}
// 		})}
// 		tabBarOptions={{
// 			activeTintColor: 'tomato',
// 			inactiveTintColor: 'gray',
// 		}}>
// 			<Tab.Screen name="ProfileContent" component={ProfileContent} options={{ title: 'Profil' }} />
// 			<Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Innstillinger' }} />
// 			{/* Legg til flere Tab.Screen komponenter etter behov */}
// 		</Tab.Navigator>
// 	);
// }

// export default function ProfileScreen() {
// 	return (
// 		<NavigationContainer independent={true}>
// 			<ProfileScreenNavigationProp.Navigator>
// 				<ProfileScreenNavigationProp.Screen name="ProfileScreenNavigator" component={TabNavigator} options={{ headerShown: false }} />
// 			</ProfileScreenNavigationProp.Navigator>
// 		</NavigationContainer>
// 	);
// }

// import React, { useState, useEffect } from "react";
// import {
// 	ScrollView,
// 	View,
// 	Text,
// 	Image,
// 	Alert,
// 	TouchableOpacity,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import {
// 	auth,
// 	subscribeToUserProfile,
// } from "../Services/Firebase/firebaseConfig";
// import { signOut } from "firebase/auth";
// import { theme } from "../theme";

// import { styles } from "../Styles/ProfileScreen_Style";
// import { RootStackParamList } from "../Navigation/navigationTypes";

// type ProfileScreenNavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	"ProfileScreen"
// >;

// const ProfileScreen: React.FC = () => {
// 	const [userName, setUserName] = useState("");
// 	const navigation = useNavigation<ProfileScreenNavigationProp>();

// 	useEffect(() => {
// 		const userId = auth.currentUser?.uid;
// 		if (userId) {
// 			const unsubscribe = subscribeToUserProfile(userId, (data) => {
// 				setUserName(data.username || "Bruker");
// 			});
// 			return () => unsubscribe();
// 		}
// 	}, []);

// 	// const handleSignOut = async () => {
// 	// 	try {
// 	// 		await signOut(auth);
// 	// 		navigation.navigate("Front");
// 	// 	} catch (error) {
// 	// 		Alert.alert("Feil", `Noe gikk galt under utlogging.: ${error.message}`);
// 	// 	}
// 	// };

// 	const handleHelp = () => {
// 		navigation.navigate("UserGuideScreen");
// 	};

// 	return (
// 		// Husk å fjerne scrollview ettersom vi ikke skal benytte dette

// 		<View style={styles.container}>
// 			<View style={{ flex: 1 }}>
// 				<TouchableOpacity onPress={handleHelp} style={styles.helpButton}>
// 					<Icon name="help-circle" size={24} color={theme.colors.helpButton} />
// 				</TouchableOpacity>

// 				<View style={styles.headerContainer}>
// 					<Image
// 						source={require("../Assets/Robot_1.png")}
// 						style={styles.profileImage}
// 					/>
// 					<Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
// 				</View>

// 				<TouchableOpacity
// 					style={[styles.menuItem, styles.fullWidthButton]}
// 					onPress={() => navigation.navigate("FocusScreen")}
// 				>
// 					<Text style={styles.menuText}>Finn min diagnose 👨🏻‍⚕️</Text>
// 				</TouchableOpacity>
// 				<View style={styles.gridContainer}>
// 					{/* Plasser kolonneknapper her- må legges i par hvis det skal bli riktig */}
// 					<TouchableOpacity
// 						style={styles.menuItem}
// 						onPress={() => navigation.navigate("ExerciseOverviewScreen")}
// 					>
// 						<Text style={styles.menuText}>Mine øvelser</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.menuItem}
// 						onPress={() => navigation.navigate("ExerciseScreen")}
// 					>
// 						<Text style={styles.menuText}>Søk etter øvelser</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.menuItem}
// 						onPress={() => navigation.navigate("ProgressScreen")}
// 					>
// 						<Text style={styles.menuText}>Progress</Text>
// 					</TouchableOpacity>
// 				</View>

// 				<TouchableOpacity
// 					style={[styles.menuItem, styles.fullWidthButton, styles.bobButton]}
// 					onPress={() => navigation.navigate("ChatScreen")}
// 				>
// 					<Text style={styles.bobText}>BobAI 🤖</Text>
// 					{/* <Image
// 		source={require("../Assets/Robot_2.png")}
// 		style={styles.bobImage}
// 	/> */}
// 				</TouchableOpacity>

// 				<View style={styles.fullWidthContainer}>
// <TouchableOpacity
// 	style={[styles.menuItem, styles.fullWidthButton]}
// 	onPress={() => navigation.navigate("SettingsScreen")}
// >
// 	<Text style={styles.menuText}>Min profil</Text>
// </TouchableOpacity>
// 				</View>

// 				{/* <TouchableOpacity
//           style={[styles.menuItem, styles.fullWidthButton]}
//           onPress={() => {}}
//         >
//           <Text style={styles.menuText}>Send melding til behandler</Text>
//         </TouchableOpacity> */}

// 				{/* Fjerne denne fra forsiden?  */}
// 				{/* <TouchableOpacity
// 					style={styles.menuItem}
// 					onPress={() => navigation.navigate("HealthScreen")}
// 				>
// 					<Text style={styles.menuText}>Helsedata</Text>
// 				</TouchableOpacity> */}
// 			</View>
// 			{/* <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
// 				<Text style={styles.logoutButtonText}>Logg ut</Text>
// 			</TouchableOpacity> */}
// 		</View>
// 	);
// };

// export default ProfileScreen;

//----------------------------------------------------------------
//Kan slette denne også tror jeg.. gammel kode. 


// import React, { useState, useEffect } from "react";
// import {
// 	View,
// 	Text,
// 	Image,
// 	Alert,
// 	TouchableOpacity,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import {
// 	auth,
// 	subscribeToUserProfile,
// } from "../Services/Firebase/FirebaseConfig";
// import { theme } from "../theme";

// import { styles } from "../Styles/ProfileScreen_Style";
// import { RootStackParamList } from "../Navigation/navigationTypes";

// type ProfileScreenNavigationProp = StackNavigationProp<
// 	RootStackParamList,
// 	"ProfileScreen"
// >;

// const ProfileScreen: React.FC = () => {
// 	const [userName, setUserName] = useState("");
// 	const navigation = useNavigation<ProfileScreenNavigationProp>();

// 	useEffect(() => {
// 		const userId = auth.currentUser?.uid;
// 		if (userId) {
// 			const unsubscribe = subscribeToUserProfile(userId, (data) => {
// 				setUserName(data.username || "Bruker");
// 			});
// 			return () => unsubscribe();
// 		}
// 	}, []);

// 	const handleHelp = () => {
// 		navigation.navigate("UserGuideScreen");
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<View style={{ flex: 1 }}>
// 				<TouchableOpacity onPress={handleHelp} style={styles.helpButton}>
// 					<Icon name="help-circle" size={24} color={theme.colors.helpButton} />
// 				</TouchableOpacity>

// 				<View style={styles.headerContainer}>

// 					<Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
// 				</View>

// 				<TouchableOpacity
// 					style={[styles.menuItem, styles.fullWidthButton]}
// 					onPress={() => navigation.navigate("FocusScreen")}
// 				>
// 					<Text style={styles.menuText}>Finn min diagnose 👨🏻‍⚕️</Text>
// 				</TouchableOpacity>
// 				<View style={styles.gridContainer}>
// 					{/* Plasser kolonneknapper her- må legges i par hvis det skal bli riktig */}
// 					<TouchableOpacity
// 						style={styles.menuItem}
// 						onPress={() => navigation.navigate("ExerciseOverviewScreen")}
// 					>
// 						<Text style={styles.menuText}>Mine øvelser</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.menuItem}
// 						onPress={() => navigation.navigate("ExerciseScreen")}
// 					>
// 						<Text style={styles.menuText}>Søk etter øvelser</Text>
// 					</TouchableOpacity>

// 					<TouchableOpacity
// 						style={[styles.menuItem]}
// 						onPress={() => navigation.navigate("ProgressScreen")}
// 					>
// 						<Text style={styles.menuText}>Progress</Text>
// 					</TouchableOpacity>

// 					<TouchableOpacity
// 						style={[styles.menuItem]}
// 						onPress={() => navigation.navigate("DiagnoseScreen")}
// 					>
// 						<Text style={styles.menuText}>Mine diagnoser</Text>
// 					</TouchableOpacity>
// 				</View>
// 				<TouchableOpacity
// 					style={[styles.menuItem, styles.fullWidthButton, styles.bobButton]}
// 					onPress={() => navigation.navigate("ChatScreen")}
// 				>
// 					<Text style={styles.bobText}>BobAI 🤖</Text>
// 				</TouchableOpacity>

// 				<View style={styles.fullWidthContainer}>
// 					<TouchableOpacity
// 						style={[styles.menuItem, styles.fullWidthButton]}
// 						onPress={() => navigation.navigate("SettingsScreen")}
// 					>
// 						<Text style={styles.menuText}>Min profil</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };

// export default ProfileScreen;

