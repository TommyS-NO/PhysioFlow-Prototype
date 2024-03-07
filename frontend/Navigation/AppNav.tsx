import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import TermsScreen from "../Screens/TermsScreen";
import TBA from "../Screens/TBA";
import TBNScreen from "../Screens/TBNScreen";
import UserGuideScreen from "../Screens/UserGuideScreen";
import InfoScreen from "../Screens/InfoScreen";
import { RootStackParamList } from "./navigationTypes";
import ExerciseOverviewScreen from "../Screens/ExerciseOverviewScreen";

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
				options={{ title: "Mitt Treningsprogram" }}
			/>
			<Stack.Screen
				name="TBNScreen"
				component={TBNScreen}
				options={{ title: "TBN" }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
