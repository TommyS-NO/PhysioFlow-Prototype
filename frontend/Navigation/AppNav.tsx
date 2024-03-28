import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen";
import TermsScreen from "../Screens/TermsScreen";
import FocusScreen from "../Screens/FocusScreen";
import UserGuideScreen from "../Screens/UserGuideScreen";

import { RootStackParamList } from "./navigationTypes";
import ExerciseOverviewScreen from "../Screens/ExerciseOverviewScreen";
import DeleteUserScreen from "../Screens/DeleteUserScreen";
import AboutScreen from "../Screens/AboutScreen";
import SearchScreen from "../Screens/SearchScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import ContactScreen from "../Screens/ContactScreen";
import RegisterWorkout from "../Screens/RegisterWorkout";

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
				name="ExerciseSession"
				component={ExerciseOverviewScreen}
				options={{ title: "Mitt treningsprogram" }}
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
				name="SearchScreen"
				component={SearchScreen}
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
			<Stack.Screen
				name="RegisterWorkout"
				component={RegisterWorkout}
				options={{ title: "Registrer økt" }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
