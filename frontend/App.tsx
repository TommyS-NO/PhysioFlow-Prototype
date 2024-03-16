import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNav from "./Navigation/AppNav";
import { UserProvider } from "./Context/UserContext";

export default function App() {
	return (
		<UserProvider>
			<View style={styles.container}>
				<AppNav />
				<StatusBar style="auto" />
			</View>
		</UserProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
