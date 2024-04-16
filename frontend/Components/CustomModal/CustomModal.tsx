import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ModalProps,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface CustomModalProps
  extends Omit<ModalProps, "visible" | "onRequestClose"> {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  children,
  style,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={[styles.modalView, style]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons
            name="close-circle"
            size={24}
            color="#D32F2F"
          />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    // margin: 20,
    // backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    // shadowRadius: 4,
    // elevation: 5,
	// width: '90%', 
	// maxWidth: '500', 
	// alignSelf: 'center', //Trenger vi den? 

//Dette oppsette fungerer bra med tanke på registrering av treningsøkter
    marginHorizontal: 85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowRadius: 4,
    elevation: 5,
    maxWidth: "95%",	
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CustomModal;
