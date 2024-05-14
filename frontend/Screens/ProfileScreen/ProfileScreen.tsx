import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	Alert,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
	auth,
	subscribeToUserProfile,
} from "../../Services/Firebase/FirebaseConfig";
import { theme } from "../../theme";
import { styles } from "./ProfileScreen_Style";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import FooterNavigation from "../../Navigation/FooterNavigation/FooterNavigation";

type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"ProfileScreen"
>;

const ProfileScreen: React.FC = () => {
	const [userName, setUserName] = useState("");
	const [showTrainingMenu, setShowTrainingMenu] = useState(false);
	const [showDiagnoseMenu, setShowDiagnoseMenu] = useState(false);

	const navigation = useNavigation<ProfileScreenNavigationProp>();

	useEffect(() => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			const unsubscribe = subscribeToUserProfile(userId, (data) => {
				setUserName(data.username || "Bruker");
			});
			return () => unsubscribe();
		}
	}, []);

	const toggleTrainingMenu = () => {
		setShowTrainingMenu(!showTrainingMenu);
	};

	const toggleDiagnoseMenu = () => {
		setShowDiagnoseMenu(!showDiagnoseMenu);
	};

	return (
		<View style={styles.container}>
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.headerContainer}>
					<Text style={styles.welcomeText}>Velkommen, {userName}!</Text>
				</View>
				<TouchableOpacity
					style={styles.settingsButton}
					onPress={() => {
						console.log("Navigation object:", navigation);
						navigation.navigate("SettingsScreen");
					}}
				>
					<Icon name="account-cog" size={24} color={theme.colors.helpButton} />
				</TouchableOpacity>
				<View style={styles.fullWidthContainer}>
					<TouchableOpacity
						style={[styles.menuItem, styles.profileButton]}
						onPress={toggleDiagnoseMenu}
					>
						<Text style={styles.profileButtonText}>Diagnoser</Text>
						<Image
							source={require("../../Assets/Welcome.png")}
							style={styles.diagnoseImage}
							accessibilityLabel="Welcoming person"
						/>
					</TouchableOpacity>

					{showDiagnoseMenu && (
						<View>
							<TouchableOpacity
								style={[styles.menuItem, styles.profileButton]}
								onPress={() => navigation.navigate("FocusScreen")}
							>
								<Text style={styles.menuText}>Finn diagnose</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.menuItem, styles.fullWidthButton]}
								onPress={() => navigation.navigate("DiagnoseScreen")}
							>
								<Text style={styles.menuText}>Mine diagnoseresultater</Text>
							</TouchableOpacity>
						</View>
					)}

					<TouchableOpacity
						style={[styles.menuItem, styles.profileButton]}
						onPress={toggleTrainingMenu}
					>
						<Image
							source={require("../../Assets/StretchMale.png")}
							style={styles.trainingImage}
							accessibilityLabel="Stretching male"
						/>
						<Text style={styles.profileButtonText}>Trening</Text>
					</TouchableOpacity>

					{showTrainingMenu && (
						<View>
							<TouchableOpacity
								style={[styles.menuItem, styles.fullWidthButton]}
								onPress={() => navigation.navigate("ExerciseOverviewScreen")}
							>
								<Text style={styles.menuText}>Mine øvelser</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.menuItem, styles.fullWidthButton]}
								onPress={() => navigation.navigate("ExerciseScreen")}
							>
								<Text style={styles.menuText}>Søk etter øvelser</Text>
							</TouchableOpacity>
						</View>
					)}

					<TouchableOpacity
						style={[styles.menuItem, styles.profileButton]}
						onPress={() => navigation.navigate("ChatScreen")}
					>
						<Text style={styles.profileButtonText}>BobAI Chat</Text>
						<Image
							source={require("../../Assets/Robot.png")}
							style={styles.bobaiImage}
							accessibilityLabel="Robot"
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<FooterNavigation />
		</View>
	);
};

export default ProfileScreen;
