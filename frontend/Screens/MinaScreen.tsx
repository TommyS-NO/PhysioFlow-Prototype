import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MinaScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>MINA</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
	},
});

export default MinaScreen;
