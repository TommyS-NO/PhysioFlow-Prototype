import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNav from "./Navigation/AppNav";
import { UserProvider } from "./Context/UserContext";
import { FocusAreaProvider } from "./Context/FocusContext";
import SurveyProvider from "./Context/SurveyContext";
import { ExerciseProvider } from "./Context/ExerciseContext";

export default function App() {
	return (
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

// Denne er satt opp i forbindelse med navbar. Kommenterer foreløpig ut da ting ikke virker helt optimalt enda.
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native"; 
// import TabNavigation from "./Components/TabNavigation/TabNavigation";
// import { UserProvider } from "./Context/UserContext";
// import { FocusAreaProvider } from "./Context/FocusContext";
// import SurveyProvider from "./Context/SurveyContext";
// import { ExerciseProvider } from "./Context/ExerciseContext";

// export default function App() {
// 	return (
// 		<UserProvider>
// 			<SurveyProvider>
// 				<FocusAreaProvider>
// 					<ExerciseProvider>
// 					<NavigationContainer>
//                             <View style={styles.container}>
//                                 <TabNavigation />
//                                 <StatusBar style="auto" />
//                             </View>
//                         </NavigationContainer>
// 					</ExerciseProvider>
// 				</FocusAreaProvider>
// 			</SurveyProvider>
// 		</UserProvider>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 	},
// });
