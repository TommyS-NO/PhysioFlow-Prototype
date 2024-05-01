import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen";
import TermsScreen from "../Screens/TermsScreen";
import FocusScreen from "../Screens/FocusScreen/FocusScreen";
import UserGuideScreen from "../Screens/UserGuideScreen";
import NewScreen from "../Screens/NewScreen";
import { RootStackParamList } from "./navigationTypes";
import ExerciseOverviewScreen from "../Screens/ExerciseOverviewScreen/ExerciseOverviewScreen";
import DeleteUserScreen from "../Screens/DeleteUserScreen";
import AboutScreen from "../Screens/AboutScreen";
import ExerciseScreen from "../Screens/ExerciseScreen/ExerciseScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import ContactScreen from "../Screens/ContactScreen";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ProgressScreen from "../Screens/ProgressScreen/ProgressScreen";
import DiagnoseScreen from "../Screens/DiagnoseScreen/DiagnoseScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNav = () => (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Front">
			<Stack.Screen
				name="Front"
				component={FrontScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{ title: "Registrer" }}
			/>
			<Stack.Screen
				name="TermsScreen"
				component={TermsScreen}
				options={{ title: "Vilkår og Betingelser" }}
			/>
			<Stack.Screen
				name="UserGuideScreen"
				component={UserGuideScreen}
				options={{ title: "Brukerveiledning" }}
			/>
			<Stack.Screen
				name="ExerciseOverviewScreen"
				component={ExerciseOverviewScreen}
				options={{ title: "Liste" }}
			/>
			<Stack.Screen
				name="FocusScreen"
				component={FocusScreen}
				options={{ title: "Fokusområde" }}
			/>
			<Stack.Screen
				name="DeleteUserScreen"
				component={DeleteUserScreen}
				options={{ title: "Slett profil" }}
			/>
			<Stack.Screen
				name="AboutScreen"
				component={AboutScreen}
				options={{ title: "Om oss" }}
			/>
			<Stack.Screen
				name="ExerciseScreen"
				component={ExerciseScreen}
				options={{ title: "Søk etter øvelser" }}
			/>
			<Stack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{ title: "Min profil" }}
			/>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: "Settings" }}
			/>
			<Stack.Screen
				name="ContactScreen"
				component={ContactScreen}
				options={{ title: "Kontakt oss" }}
			/>
			{/* <Stack.Screen
				name="RegisterWorkout"
				component={RegisterWorkout}
				options={{ title: "Registrer økt" }}
			/> */}
			<Stack.Screen
				name="NewScreen"
				component={NewScreen}
				options={{ title: "new" }}
			/>
			{/* <Stack.Screen
				name="ExerciseScreen"
				component={ExerciseScreen}
				options={{ title: "Trening" }}
			/> */}
			<Stack.Screen
				name="ChatScreen"
				component={ChatScreen}
				options={{ title: "Chat" }} // Legg til ChatScreen i navigasjonen
			/>
			<Stack.Screen
				name="ProgressScreen"
				component={ProgressScreen}
				options={{ title: "ProgressScreen" }}
			/>
					<Stack.Screen
				name="DiagnoseScreen"
				component={DiagnoseScreen}
				options={{ title: "DiagnoseScreen" }}
			/>
			{/* <Stack.Screen
				name="CompletedWorkoutsScreen"
				component={CompletedWorkoutsScreen}
				options={{ title: "Utførte treningsøkter" }}
			/> */}
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
