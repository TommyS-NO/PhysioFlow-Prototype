import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, Modal } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import { FocusAreaKey } from "../../../Context/FocusContext";
import { styles } from "./BodyChart_Style";

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
            <Text style={styles.modalTitle}>Bodychart fokusområde</Text>
            <Text style={styles.modalText}>
              Trykk på det markerte fokusområdet du har smerter. Du må nå svare
              på noen kartleggingsspørsmål slik at vi kan gi deg antatt diagnose
              i retur. Velg forside eller bakside kropp ved å trykke på pilene
              over.
            </Text>
            <TouchableOpacity 
              style={styles.understoodButton} 
              onPress={() => setInfoModalVisible(!infoModalVisible)}
            >
              <Text style={styles.understoodButtonText}>Forstått</Text>
            </TouchableOpacity>
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
           name="arrow-left"
          size={30}
          color="#000"
          onPress={toggleBodySide}
        />
        <Text style={styles.bodySideText}>
          {bodySide === "front" ? "Forside kropp" : "Bakside kropp"}
        </Text>
        <MaterialCommunityIcons
          name="arrow-right"
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

export default BodyChart;