import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import TermsScreen from "../Screens/TermsScreen";
import TBA from "../Screens/TBA";
import FocusScreen from "../Screens/FocusScreen";
import UserGuideScreen from "../Screens/UserGuideScreen";
import InfoScreen from "../Screens/InfoScreen";
import { RootStackParamList } from "./navigationTypes";
import ExerciseOverviewScreen from "../Screens/ExerciseOverviewScreen";
import DeleteUserScreen from "../Screens/DeleteUserScreen";
import AboutScreen from "../Screens/AboutScreen";
import SearchScreen from "../Screens/SearchScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNav: React.FC = () => (
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
			<Stack.Screen name="TBA" component={TBA} options={{ title: "TBA" }} />
			<Stack.Screen
				name="UserGuideScreen"
				component={UserGuideScreen}
				options={{ title: "Brukerveiledning" }}
			/>
			<Stack.Screen
				name="InfoScreen"
				component={InfoScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ExerciseSession"
				component={ExerciseOverviewScreen}
				options={{ title: "Mitttreningsprogram" }}
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
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
