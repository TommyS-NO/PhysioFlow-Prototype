import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FrontScreen from "../Screens/FrontScreen";
import RegisterScreen from "../Screens/RegisterScreen";
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
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNav;
