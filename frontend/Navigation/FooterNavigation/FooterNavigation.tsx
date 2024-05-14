import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../navigationTypes";

const FooterNavigation = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("ProfileScreen")}
				style={styles.button}
			>
				<MaterialCommunityIcons name="home" size={24} color="#26807C" />
				<Text>Home</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate("SettingsScreen")}
				style={styles.button}
			>
				<MaterialCommunityIcons name="menu" size={24} color="#26807C" />
				<Text>Settings</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
		backgroundColor: "#f1f1f1",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.35,
		shadowRadius: 3.84,
		elevation: 5,
	},
	button: {
		alignItems: "center",
		marginBottom: 15,
		paddingHorizontal: 10,
	},
});

export default FooterNavigation;
