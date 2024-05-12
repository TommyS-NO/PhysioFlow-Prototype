import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNav from "./Navigation/AppNav";
import { UserProvider } from "./Context/UserContext";
import { FocusAreaProvider } from "./Context/FocusContext";
import SurveyProvider from "./Context/SurveyContext";
import { ExerciseProvider } from "./Context/ExerciseContext";

const App = () => (
	<UserProvider>
		<SurveyProvider>
			<FocusAreaProvider>
				<ExerciseProvider>
					<View style={styles.container}>
						<AppNav />
						<StatusBar style="auto" />
					</View>
				</ExerciseProvider>
			</FocusAreaProvider>
		</SurveyProvider>
	</UserProvider>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default App;
