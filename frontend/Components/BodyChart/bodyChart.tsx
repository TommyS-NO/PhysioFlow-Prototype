import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface BodyChartProps {
	bodySide: "front" | "back";
	onAreaPress: (area: FocusArea) => void;
	toggleBodySide: () => void;
}

type FocusArea =
	| "Hode/Nakke"
	| "Skulder"
	| "Albue"
	| "Håndledd/Hånd"
	| "Øvre rygg"
	| "Nedre rygg"
	| "Hofte"
	| "Kne"
	| "Ankel/Fot";

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
			<Image
				source={
					bodySide === "front"
						? require("../../Assets/bodyChartFront.png")
						: require("../../Assets/bodyChartBack.png")
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
						onPress={() => onAreaPress("Håndledd/Hånd")}
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
						onPress={() => onAreaPress("Ankel/Fot")}
					/>
				</>
			) : (
				<>
					<TouchableOpacity
						style={styles.upperBackArea}
						onPress={() => onAreaPress("Øvre rygg")}
					/>
					<TouchableOpacity
						style={styles.lowerBackArea}
						onPress={() => onAreaPress("Nedre rygg")}
					/>
					<TouchableOpacity
						style={styles.elbowArea}
						onPress={() => onAreaPress("Albue")}
					/>
					<TouchableOpacity
						style={styles.neckArea}
						onPress={() => onAreaPress("Hode/Nakke")}
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
		top: "28%",
		left: "49%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
	wristHandArea: {
		position: "absolute",
		top: "53%",
		left: "58%",
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
		left: "44%",
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
		left: "41%",
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
		left: "41%",
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
		left: "34%",
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
		left: "34%",
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
		left: "54%",
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
		left: "34%",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(255,0,0,0.7)",
	},
});

export default BodyChart;
