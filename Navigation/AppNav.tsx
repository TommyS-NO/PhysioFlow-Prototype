import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import TermsScreen from "../Screens/TermsScreen";
import InfoScreen from "../Screens/InfoScreen";
const Stack = createStackNavigator();

const AppNav: React.FC = () => (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Front">
			<Stack.Screen
				name="Front"
				component={FrontScreen}
				options={{ title: "Hjem" }}
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
				name="Info"
				component={InfoScreen}
				options={{ title: "Registrer" }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
