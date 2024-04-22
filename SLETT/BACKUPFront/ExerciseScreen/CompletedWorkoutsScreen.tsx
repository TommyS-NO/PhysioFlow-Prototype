// import React, { useState, useEffect } from "react";
// import {
// 	View,
// 	Text,
// 	FlatList,
// 	Alert,
// 	StyleSheet,
// 	TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// type Session = {
// 	date: string;
// };

// const CompletedWorkoutsScreen = () => {
// 	const [sessions, setSessions] = useState<Session[]>([]);
// 	const navigation = useNavigation();

// 	useEffect(() => {
// 		const fetchSessions = async () => {
// 			try {
// 				const storedSessions = await AsyncStorage.getItem("workoutSessions");
// 				const parsedSessions = storedSessions ? JSON.parse(storedSessions) : [];
// 				setSessions(parsedSessions);
// 			} catch (error) {
// 				Alert.alert("Feil", "Kunne ikke hente utførte treningsøkter.");
// 			}
// 		};

// 		fetchSessions();
// 	}, []);

// 	const handleEditSession = (session: Session) => {
// 		// Naviger til redigeringsskjerm med parameterne for økten
// 		navigation.navigate("NewScreen", { session });
// 	};

// 	const handleRemoveSession = async (sessionDate: string) => {
// 		const filteredSessions = sessions.filter(
// 			(session) => session.date !== sessionDate,
// 		);
// 		await AsyncStorage.setItem(
// 			"workoutSessions",
// 			JSON.stringify(filteredSessions),
// 		);
// 		setSessions(filteredSessions);
// 		Alert.alert("Suksess", "Økten ble fjernet.");
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<FlatList
// 				data={sessions}
// 				keyExtractor={(item) => item.date}
// 				renderItem={({ item }) => (
// 					<View style={styles.sessionItem}>
// 						<Text style={styles.sessionDate}>
// 							{new Date(item.date).toLocaleDateString()}
// 						</Text>
// 						<View style={styles.buttons}>
// 							<TouchableOpacity
// 								onPress={() => handleEditSession(item)}
// 								style={styles.editButton}
// 							>
// 								<Text style={styles.buttonText}>Rediger</Text>
// 							</TouchableOpacity>
// 							<TouchableOpacity
// 								onPress={() => handleRemoveSession(item.date)}
// 								style={styles.removeButton}
// 							>
// 								<Text style={styles.buttonText}>Fjern</Text>
// 							</TouchableOpacity>
// 						</View>
// 					</View>
// 				)}
// 			/>
// 		</View>
// 	);
// };
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		padding: 20,
// 	},
// 	sessionItem: {
// 		marginBottom: 10,
// 		padding: 10,
// 		backgroundColor: '#"rgba(38, 128, 124, 0.2)"',
// 		borderRadius: 5,
// 	},
// 	sessionHeader: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 	},
// 	sessionDate: {
// 		fontSize: 16,
// 		fontWeight: "bold",
// 	},
// 	buttons: {
// 		flexDirection: "row",
// 		justifyContent: "flex-end",
// 		alignItems: "center",
// 	},
// 	editButton: {
// 		marginLeft: 10,
// 		paddingHorizontal: 8,
// 		paddingVertical: 10,
// 		borderRadius: 5,
// 		backgroundColor: "#26807C",
// 	},
// 	removeButton: {
// 		marginLeft: 10,
// 		paddingHorizontal: 8,
// 		paddingVertical: 10,
// 		borderRadius: 5,
// 		backgroundColor: "#D32F2F",
// 	},

// 	buttonText: {
// 		color: "#FFFFFF",
// 		fontSize: 14,
// 	},
// 	exerciseText: {
// 		fontSize: 14,
// 	},
// });

// export default CompletedWorkoutsScreen;
