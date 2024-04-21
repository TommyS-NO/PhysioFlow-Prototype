import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FocusAreaKey } from "../../../Context/FocusContext";

interface BodyChartProps {
	bodySide: "front" | "back";
	onAreaPress: (area: FocusAreaKey) => void;
	toggleBodySide: () => void;
}

const BodyChart: React.FC<BodyChartProps> = ({
	bodySide,
	onAreaPress,
	toggleBodySide,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.toggleBodyContainer}>
				<MaterialCommunityIcons
					name="chevron-left"
					size={30}
					color="#000"
					onPress={toggleBodySide}
				/>
				<Text style={styles.bodySideText}>
					{bodySide === "front" ? "Forsiden" : "Baksiden"}
				</Text>
				<MaterialCommunityIcons
					name="chevron-right"
					size={30}
					color="#000"
					onPress={toggleBodySide}
				/>
			</View>
			<Text style={styles.title}>Bodychart Fokusområde</Text>
			<Text style={styles.text}>
				Hvor på kroppen har du smerter? Trykk på det markerte fokusområdet og
				svar deretter på noen spørsmål slik at vi kan gi deg antatt diagnose i
				retur.
			</Text>
			<Image
				source={
					bodySide === "front"
						? require("../../../Assets/bodyChartPerson.png")
						: require("../../../Assets/bodyChartBack.png")
				}
				style={styles.bodyChart}
			/>
			{bodySide === "front" ? (
				<>
					<TouchableOpacity
						style={styles.shoulderArea}
						onPress={() => onAreaPress("Skulder")}
					/>
					<TouchableOpacity
						style={styles.wristHandArea}
						onPress={() => onAreaPress("Håndledd")}
					/>
					<TouchableOpacity
						style={styles.hipArea}
						onPress={() => onAreaPress("Hofte")}
					/>
					<TouchableOpacity
						style={styles.kneArea}
						onPress={() => onAreaPress("Kne")}
					/>
					<TouchableOpacity
						style={styles.ankleFootArea}
						onPress={() => onAreaPress("Ankel")}
					/>
				</>
			) : (
				<>
					<TouchableOpacity
						style={styles.upperBackArea}
						onPress={() => onAreaPress("Øvre_rygg")}
					/>
					<TouchableOpacity
						style={styles.lowerBackArea}
						onPress={() => onAreaPress("Nedre_rygg")}
					/>
					<TouchableOpacity
						style={styles.elbowArea}
						onPress={() => onAreaPress("Albue")}
					/>
					<TouchableOpacity
						style={styles.neckArea}
						onPress={() => onAreaPress("Nakke")}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	toggleBodyContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
	bodySideText: {
		marginHorizontal: 10,
		fontSize: 16,
	},
	bodyChart: {
		width: 300,
		height: 600,
		resizeMode: "contain",
	},
	shoulderArea: {
		position: "absolute",
		top: "34%",
		left: "62%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	wristHandArea: {
		position: "absolute",
		top: "56%",
		left: "65%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	hipArea: {
		position: "absolute",
		top: "49%",
		left: "56%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	kneArea: {
		position: "absolute",
		top: "72%",
		left: "56%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	ankleFootArea: {
		position: "absolute",
		top: "90%",
		left: "55%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	upperBackArea: {
		position: "absolute",
		top: "30%",
		left: "48%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	lowerBackArea: {
		position: "absolute",
		top: "46%",
		left: "48%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	elbowArea: {
		position: "absolute",
		top: "42%",
		left: "68%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	neckArea: {
		position: "absolute",
		top: "22%",
		left: "50%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
});

export default BodyChart;

// import React from "react";
// import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Svg, Circle } from "react-native-svg";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// type FocusArea =
// 	| "Nakke"
// 	| "Skulder"
// 	| "Albue"
// 	| "Håndledd"
// 	| "Øvre_rygg"
// 	| "Nedre_rygg"
// 	| "Hofte"
// 	| "Kne"
// 	| "Ankel";

// interface BodyChartProps {
// 	bodySide: "front" | "back";
// 	onAreaPress: (area: FocusArea) => void;
// 	toggleBodySide: () => void;
// 	selectedAreas: FocusArea[];
// }
// //cx = left - cy : height
// // Konfigurasjon for posisjonering av områder på bilde
// const areaPositions: Record<FocusArea, { cx: string; cy: string }> = {
// 	Nakke: { cx: "35%", cy: "22%" },
// 	Skulder: { cx: "52%", cy: "31%" }, // ok
// 	Albue: { cx: "50%", cy: "30%" },
// 	Håndledd: { cx: "59%", cy: "55%" }, //ok
// 	Øvre_rygg: { cx: "50%", cy: "50%" },
// 	Nedre_rygg: { cx: "50%", cy: "60%" },
// 	Hofte: { cx: "50%", cy: "70%" },
// 	Kne: { cx: "45%", cy: "73%" }, // ok
// 	Ankel: { cx: "44%", cy: "92%" }, //ok
// };
// const BodyChart: React.FC<BodyChartProps> = ({
// 	bodySide,
// 	onAreaPress,
// 	toggleBodySide,
// 	selectedAreas,
// }) => {
// 	const areas =
// 		bodySide === "front"
// 			? ["Skulder", "Håndledd", "Hofte", "Kne", "Ankel"]
// 			: ["Nakke", "Øvre_rygg", "Nedre_rygg", "Albue"];

// 	return (
// 		<View style={styles.container}>
// 			{/* Veksle ikoner */}
// 			<View style={styles.toggleBodyContainer}>
// 				<MaterialCommunityIcons
// 					name="chevron-left"
// 					size={30}
// 					color="#000"
// 					onPress={toggleBodySide}
// 				/>
// 				<Text style={styles.bodySideText}>
// 					{bodySide === "front" ? "Forsiden" : "Baksiden"}
// 				</Text>
// 				<MaterialCommunityIcons
// 					name="chevron-right"
// 					size={30}
// 					color="#000"
// 					onPress={toggleBodySide}
// 				/>
// 			</View>
// 			<Text style={styles.title}>Bodychart Fokusområde</Text>
// 			<Image
// 				source={
// 					bodySide === "front"
// 						? require("../../Assets/bodyChartFront.png")
// 						: require("../../Assets/bodyChartBack.png")
// 				}
// 				style={styles.bodyChart}
// 			/>
// 			<Svg
// 				height="100%"
// 				width="100%"
// 				viewBox="0 0 300 600"
// 				style={StyleSheet.absoluteFill}
// 			>
// 				{areas.map((area) => (
// 					<Circle
// 						key={area}
// 						cx={areaPositions[area].cx}
// 						cy={areaPositions[area].cy}
// 						r="12"
// 						fill={selectedAreas.includes(area) ? "green" : "red"}
// 						onPress={() => onAreaPress(area)}
// 					/>
// 				))}
// 			</Svg>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		alignItems: "center",
// 		marginBottom: 20,
// 	},
// 	title: {
// 		fontSize: 16,
// 		fontWeight: "bold",
// 		marginBottom: 10,
// 	},
// 	toggleBodyContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		paddingVertical: 10,
// 	},
// 	bodySideText: {
// 		marginHorizontal: 10,
// 		fontSize: 16,
// 	},
// 	bodyChart: {
// 		width: 300,
// 		height: 600,
// 		resizeMode: "contain",
// 	},
// });

// export default BodyChart;
