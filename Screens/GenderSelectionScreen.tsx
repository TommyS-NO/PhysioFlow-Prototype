import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type GenderSelectionScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"GenderSelectionScreen"
>;

const GenderSelectionScreen: React.FC = () => {
	const navigation = useNavigation<GenderSelectionScreenNavigationProp>();
	const [selectedGender, setSelectedGender] = useState<
		"male" | "female" | "unspecified" | undefined
	>();

	const handleSelectGender = async (
		gender: "male" | "female" | "unspecified",
	) => {
		setSelectedGender(gender);
		try {
			const userDataJson = await AsyncStorage.getItem("user");
			const userData = userDataJson ? JSON.parse(userDataJson) : {};
			const updatedUserData = { ...userData, gender };
			await AsyncStorage.setItem("user", JSON.stringify(updatedUserData));

			Alert.alert("Suksess", "Kjønn valgt. Navigerer til neste skjerm...", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
		} catch (error) {
			Alert.alert(
				"Feil",
				"Det oppstod en feil under lagring av informasjonen.",
			);
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Velg kjønn</Text>
			<View style={styles.genderOptions}>
				<TouchableOpacity
					onPress={() => handleSelectGender("male")}
					style={[
						styles.genderOption,
						selectedGender === "male" && styles.selected,
					]}
				>
					<Image
						source={require("../Assets/Mann.png")}
						style={styles.genderImage}
					/>
					<Text>Mann</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleSelectGender("female")}
					style={[
						styles.genderOption,
						selectedGender === "female" && styles.selected,
					]}
				>
					<Image
						source={require("../Assets/Dame.png")}
						style={styles.genderImage}
					/>
					<Text>Kvinne</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={() => handleSelectGender("unspecified")}
				style={styles.unspecifiedOption}
			>
				<Text style={styles.unspecifiedText}>Ønsker ikke å oppgi</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		backgroundColor: theme.colors.background,
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
	},
	genderOptions: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 20,
	},
	genderOption: {
		alignItems: "center",
		justifyContent: "center",
	},
	selected: {
		borderColor: theme.colors.primary,
		borderWidth: 2,
	},
	genderImage: {
		width: 100,
		height: 100,
		marginBottom: 10,
	},
	unspecifiedOption: {
		marginTop: 20,
	},
	unspecifiedText: {
		fontSize: 16,
	},
});

export default GenderSelectionScreen;
