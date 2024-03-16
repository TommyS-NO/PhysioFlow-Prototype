import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	ImageBackground,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigationTypes";

type InfoScreenRouteProp = RouteProp<RootStackParamList, "InfoScreen">;

const InfoScreen = () => {
	const navigation = useNavigation();
	const route = useRoute<InfoScreenRouteProp>();
	const { title, message, onContinue } = route.params;

	const defaultContinue = () => {
		navigation.goBack();
	};

	return (
		<ImageBackground
			// source={require("../Assets/mountain.jpg")}
			style={styles.background}
		>
			<View style={styles.centeredView}>
				<View style={styles.infoScreenView}>
					<Text style={styles.infoScreenTitle}>{title}</Text>
					<Image
						source={require("../Assets/Robot_3.png")}
						style={styles.avatarStyle}
					/>
					<Text style={styles.infoScreenText}>{message}</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={onContinue || defaultContinue}
					>
						<Text style={styles.textStyle}>Fortsett</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	infoScreenView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	infoScreenTitle: {
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
	avatarStyle: {
		width: 100,
		height: 100,
		marginBottom: 15,
	},
	infoScreenText: {
		marginBottom: 15,
		textAlign: "center",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default InfoScreen;
