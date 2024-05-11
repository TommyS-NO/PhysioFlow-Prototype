//Denne koden er satt opp med feilhåndtering og alternativ visning av bilde. 

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface GenderSelectionProps {
  selectedGender: "male" | "female" | "unspecified" | undefined;
  onSelectGender: (gender: "male" | "female" | "unspecified") => void;
}

const GenderSelection = ({
  selectedGender,
  onSelectGender,
}: GenderSelectionProps) => {
  const [imageError, setImageError] = useState({ male: false, female: false });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velg kjønn</Text>
      <View style={styles.genderOptionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === "male" ? styles.selected : null,
          ]}
          onPress={() => onSelectGender("male")}
        >
          {imageError.male ? (
            <Text>Bildet kunne ikke lastes</Text>
          ) : (
            <Image
              source={require("../../../Assets/Mann.png")}
              style={styles.maleImage}
              onError={() => setImageError({ ...imageError, male: true })}
            />
          )}
          <Text>Mann</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === "female" ? styles.selected : null,
          ]}
          onPress={() => onSelectGender("female")}
        >
          {imageError.female ? (
            <Text>Bildet kunne ikke lastes</Text>
          ) : (
            <Image
              source={require("../../../Assets/Dame.png")}
              style={styles.femaleImage}
              onError={() => setImageError({ ...imageError, female: true })}
            />
          )}
          <Text>Kvinne</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGender === "unspecified" ? styles.selected : null,
        ]}
        onPress={() => onSelectGender("unspecified")}
      >
        <Text>Ønsker ikke å oppgi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  genderOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
    marginHorizontal: 3,
    flex: 1,
  },
  selected: {
    borderColor: "#26807C",
    borderWidth: 2,
  },
  maleImage: {
    width: 160,
    height: 190,
    marginBottom: 10,
    resizeMode: "contain",
  },
  femaleImage: {
    width: 160,
    height: 190,
    marginBottom: 10,
    resizeMode: "contain",
  },
});

export default GenderSelection;


//Kode uten GenderSelection-komponent for å håndtere feil ved opplasting av bilde

// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { theme } from "../../../theme";

// interface GenderSelectionProps {
//   selectedGender: "male" | "female" | "unspecified" | undefined;
//   onSelectGender: (gender: "male" | "female" | "unspecified") => void;
// }

// const GenderSelection = ({
//   selectedGender,
//   onSelectGender,
// }: GenderSelectionProps) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Velg kjønn</Text>
//       <View style={styles.genderOptionsContainer}>
//         <TouchableOpacity
//           style={[
//             styles.option,
//             selectedGender === "male" ? styles.selected : null,
//           ]}
//           onPress={() => onSelectGender("male")}
//         >
//           <Image
//             source={require("../../../Assets/Mann.png")}
//             style={styles.maleImage}
//           />
//           <Text>Mann</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.option,
//             selectedGender === "female" ? styles.selected : null,
//           ]}
//           onPress={() => onSelectGender("female")}
//         >
//           <Image
//             source={require("../../../Assets/Dame.png")}
//             style={styles.femaleImage}
//           />
//           <Text>Kvinne</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         style={[
//           styles.option,
//           selectedGender === "unspecified" ? styles.selected : null,
//         ]}
//         onPress={() => onSelectGender("unspecified")}
//       >
//         <Text>Ønsker ikke å oppgi</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 20,
//   },
//   genderOptionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     width: "100%",
//     alignItems: "center",
//   },
//   option: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "#D3D3D3",
//     borderRadius: 10,
//     marginBottom: 20,
//     backgroundColor: "white",
//     marginHorizontal: 3,
//     flex: 1,
//   },
//   selected: {
//     borderColor: "#26807C",
//     borderWidth: 2,
//   },
//   maleImage: {
//     width: 160,
//     height: 190,
//     marginBottom: 10,
//     resizeMode: "contain",
//   },
//   femaleImage: {
//     width: 160,
//     height: 190,
//     marginBottom: 10,

//     resizeMode: "contain",
//   },
// });

// export default GenderSelection;
