import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FrontScreen from "./Screens/FrontScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import TermsScreen from "./Screens/TermsScreen"; 

const Stack = createStackNavigator();

export default function App() {
	return (
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
					// options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="TermsScreen"
					component={TermsScreen}
					options={{ title: "Vilkår og Betingelser" }}
				/>
				{/* Legg til andre skjermer her */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
