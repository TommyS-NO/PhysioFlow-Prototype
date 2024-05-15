import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen";
import TermsScreen from "../Screens/RegisterScreen/TermsScreen";
import FocusScreen from "../Screens/FocusScreen/FocusScreen";
import { RootStackParamList } from "./navigationTypes";
import ExerciseOverviewScreen from "../Screens/ExerciseOverviewScreen/ExerciseOverviewScreen";
import ExerciseScreen from "../Screens/ExerciseScreen/ExerciseScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import DeleteUserScreen from "../Screens/SettingsScreen/DeleteUserScreen";
import SettingsScreen from "../Screens/SettingsScreen/SettingsScreen";
import ContactScreen from "../Screens/ProfileScreen/ContactScreen";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
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
				name="ExerciseOverviewScreen"
				component={ExerciseOverviewScreen}
				options={{ title: "Liste" }}
			/>
			<Stack.Screen
				name="FocusScreen"
				component={FocusScreen}
				options={{ title: "Fokusområde", headerShown: true }}
			/>
			<Stack.Screen
				name="ExerciseScreen"
				component={ExerciseScreen}
				options={{ title: "Søk etter øvelser", headerShown: true }}
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
				options={{ title: "Kontakt oss", headerShown: true }}
			/>

			<Stack.Screen
				name="ChatScreen"
				component={ChatScreen}
				options={{ title: "Chat" }}
			/>
			<Stack.Screen
				name="DiagnoseScreen"
				component={DiagnoseScreen}
				options={{ title: "DiagnoseScreen" }}
			/>
			<Stack.Screen
				name="DeleteUserScreen"
				component={DeleteUserScreen}
				options={{ title: "Slett" }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
