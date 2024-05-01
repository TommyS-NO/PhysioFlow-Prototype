import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../../Components/CustomButton/CustomButton";
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
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  useEffect(() => {
    setInfoModalVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!infoModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bodychart Fokusområde - Trykk på det markerte fokusområdet du har
              smerter. Du må nå svare på noen kartleggingsspørsmål slik at vi
              kan gi deg antatt diagnose i retur. Velg forside eller bakside
              kropp ved å trykke på pilene over.
            </Text>
            <CustomButton
              title="Forstått"
              onPress={() => setInfoModalVisible(!infoModalVisible)}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => setInfoModalVisible(true)}
      >
        <MaterialCommunityIcons name="information" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.toggleBodyContainer}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color="#000"
          onPress={toggleBodySide}
        />
        <Text style={styles.bodySideText}>
          {bodySide === "front" ? "Forside kropp" : "Bakside kropp"}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="#000"
          onPress={toggleBodySide}
        />
      </View>
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
    marginTop: 0,
  },
  bodySideText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  bodyChart: {
    width: 300,
    height: 600,
    resizeMode: "contain",
    marginTop: 20,
  },
  shoulderArea: {
    position: "absolute",
    top: "38%",
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
  modalView: {
    margin: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",

    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default BodyChart;

// import React from "react";
// import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { FocusAreaKey } from "../../../Context/FocusContext";

// interface BodyChartProps {
// 	bodySide: "front" | "back";
// 	onAreaPress: (area: FocusAreaKey) => void;
// 	toggleBodySide: () => void;
// }

// const BodyChart: React.FC<BodyChartProps> = ({
// 	bodySide,
// 	onAreaPress,
// 	toggleBodySide,
// }) => {
// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.toggleBodyContainer}>
// 				<MaterialCommunityIcons
// 					name="chevron-left"
// 					size={30}
// 					color="#000"
// 					onPress={toggleBodySide}
// 				/>
// 				<Text style={styles.bodySideText}>
// 					{bodySide === "front" ? "Forside kropp" : "Bakside kropp"}
// 				</Text>
// 				<MaterialCommunityIcons
// 					name="chevron-right"
// 					size={30}
// 					color="#000"
// 					onPress={toggleBodySide}
// 				/>
// 			</View>
// 			<Text style={styles.title}>Bodychart fokusområde</Text>
// 			<Text style={styles.text}>
// 				Trykk på det markerte fokusområdet du har smerter.Du må nå svare på noen kartleggingsspørsmål slik at vi kan gi deg antatt diagnose i
// 				retur. Velg forside eller bakside kropp ved å trykke på pilene over.
// 			</Text>
// 			<Image
// 				source={
// 					bodySide === "front"
// 						? require("../../../Assets/bodyChartPerson.png")
// 						: require("../../../Assets/bodyChartBack.png")
// 				}
// 				style={styles.bodyChart}
// 			/>
// 			{bodySide === "front" ? (
// 				<>
// 					<TouchableOpacity
// 						style={styles.shoulderArea}
// 						onPress={() => onAreaPress("Skulder")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.wristHandArea}
// 						onPress={() => onAreaPress("Håndledd")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.hipArea}
// 						onPress={() => onAreaPress("Hofte")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.kneArea}
// 						onPress={() => onAreaPress("Kne")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.ankleFootArea}
// 						onPress={() => onAreaPress("Ankel")}
// 					/>
// 				</>
// 			) : (
// 				<>
// 					<TouchableOpacity
// 						style={styles.upperBackArea}
// 						onPress={() => onAreaPress("Øvre_rygg")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.lowerBackArea}
// 						onPress={() => onAreaPress("Nedre_rygg")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.elbowArea}
// 						onPress={() => onAreaPress("Albue")}
// 					/>
// 					<TouchableOpacity
// 						style={styles.neckArea}
// 						onPress={() => onAreaPress("Nakke")}
// 					/>
// 				</>
// 			)}
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
// 	shoulderArea: {
// 		position: "absolute",
// 		top: "38%",
// 		left: "62%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	wristHandArea: {
// 		position: "absolute",
// 		top: "56%",
// 		left: "65%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	hipArea: {
// 		position: "absolute",
// 		top: "49%",
// 		left: "56%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	kneArea: {
// 		position: "absolute",
// 		top: "72%",
// 		left: "56%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	ankleFootArea: {
// 		position: "absolute",
// 		top: "90%",
// 		left: "55%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	upperBackArea: {
// 		position: "absolute",
// 		top: "30%",
// 		left: "48%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	lowerBackArea: {
// 		position: "absolute",
// 		top: "46%",
// 		left: "48%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	elbowArea: {
// 		position: "absolute",
// 		top: "42%",
// 		left: "68%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// 	neckArea: {
// 		position: "absolute",
// 		top: "22%",
// 		left: "50%",
// 		width: 25,
// 		height: 25,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: "black",
// 		backgroundColor: "rgba(255,0,0,0.7)",
// 	},
// });

// export default BodyChart;
