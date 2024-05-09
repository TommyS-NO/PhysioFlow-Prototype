//Nytt oppsett med annen modal. CustomModalen fungerte ikke optimalt på skjermen min. Gammel kode ligger i bunn.

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NumberSpinnerProps {
  data: number[];
  selectedValue: number;
  onValueChange: (value: number) => void;
  unit: string;
  label: string;
}

const NumberSpinner: React.FC<NumberSpinnerProps> = ({
  data,
  selectedValue,
  onValueChange,
  unit,
  label,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleValueChange = (value: number) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      style={[styles.item, item === selectedValue && styles.selectedItem]}
      onPress={() => handleValueChange(item)}
    >
      <Text style={styles.itemText}>{`${item} ${unit}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedValueText}>
          {selectedValue
            ? `${label}: ${selectedValue} ${unit}`
            : `Klikk her for å registrere ${label}`}
        </Text> 
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{`Velg ${label}`}</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
              extraData={selectedValue}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Lukk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"

  },
  closeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: "#26807C",
    marginTop:20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  itemText: {
    fontSize: 24,
  },
  selectedItem: {
    backgroundColor: "#e7e7e7",
  },
  selectedValueText: {
    fontWeight: "bold",
    fontSize: 16,
    color:  "#26807C",
    padding: 10,
    marginTop: 10,
    textAlign: "center",
  },
});

export default NumberSpinner;



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import CustomModal from "../../../Components/CustomModal/CustomModal";

// interface NumberSpinnerProps {
//   data: number[];
//   selectedValue: number;
//   onValueChange: (value: number) => void;
//   unit: string;
//   label: string;
// }

// const NumberSpinner: React.FC<NumberSpinnerProps> = ({
//   data,
//   selectedValue,
//   onValueChange,
//   unit,
//   label,
// }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleValueChange = (value: number) => {
//     onValueChange(value);
//     setModalVisible(false);
//   };

//   const renderItem = ({ item }: { item: number }) => (
//     <TouchableOpacity
//       style={[styles.item, item === selectedValue && styles.selectedItem]}
//       onPress={() => handleValueChange(item)}
//     >
//       <Text style={styles.itemText}>{`${item} ${unit}`}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <TouchableOpacity onPress={() => setModalVisible(true)}>
//         <Text style={styles.selectedValueText}>
//           {selectedValue
//             ? `${label}: ${selectedValue} ${unit}`
//             : `Klikk her for å velge ${label}`}
//         </Text>
//       </TouchableOpacity>
//       <CustomModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title={`Velg ${label}`}
//       >
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.toString()}
//           showsVerticalScrollIndicator={false}
//           extraData={selectedValue}
//         />
//       </CustomModal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   item: {
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//   },
//   itemText: {
//     fontSize: 24,
//   },
//   selectedItem: {
//     backgroundColor: "#e7e7e7",
//   },
//   selectedValueText: {
//     fontWeight: "bold",
//     fontSize: 18,
//     color: "black",
//     marginTop: 10,
//     textAlign: "center",
//   },
// });

// export default NumberSpinner;

