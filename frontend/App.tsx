import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNav from "./Navigation/AppNav";
import { UserProvider } from "./Context/UserContext";
import { FocusAreaProvider } from "./Context/FocusContext";
import SurveyProvider from "./Context/SurveyContext";

export default function App() {
	return (
		<SurveyProvider>
			<FocusAreaProvider>
				<UserProvider>
					<View style={styles.container}>
						<AppNav />
						<StatusBar style="auto" />
					</View>
				</UserProvider>
			</FocusAreaProvider>
		</SurveyProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
