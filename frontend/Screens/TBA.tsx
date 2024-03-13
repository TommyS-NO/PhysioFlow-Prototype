import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../Components/CustomButton/CustomButton";
import { RootStackParamList } from "../Navigation/navigationTypes";

type TBANavigationProp = StackNavigationProp<RootStackParamList, "TBA">;

const TBA: React.FC = () => {
	const navigation = useNavigation<TBANavigationProp>();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Under utvikling...</Text>
			<CustomButton
				title="Gå til Mitt Treningsprogram"
				onPress={() => navigation.navigate("ExerciseSession")}
			/>
			<CustomButton
				title="Fokusområde"
				onPress={() => navigation.navigate("FocusScreen")}
			/>
			<CustomButton
				title="MINA område"
				onPress={() => navigation.navigate("MinaScreen")}
			/>
			<CustomButton
				title="Om oss"
				onPress={() => navigation.navigate("AboutScreen")}
			/>
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
		marginBottom: 20,
	},
});

export default TBA;
