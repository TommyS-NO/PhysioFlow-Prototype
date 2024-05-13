//Gjort om til modal-kan slettes

// import React from "react";
// import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
// // import FooterNavigation from "../Components/FooterNavigation/FooterNavigation";
// import { theme } from "../theme";

// const AboutScreen: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>PhysioFlow</Text>
//         <ScrollView style={styles.textContainer}>
//           <Text style={styles.text}>
//             Velkommen til PhysioFlow - din digitale partner for fysioterapi og
//             rehabilitering, når og hvor det passer deg.{" "}
//           </Text>
//           <Text style={styles.text}>
//             Ved å kombinere det nyeste innen kunstig intelligens (AI) med
//             ekspertisen til vårt team av fysioterapeuter, har vi skapt en unik
//             plattform designet for å gi deg personlig tilpasset veiledning og
//             støtte gjennom din rehabiliteringsreise.
//           </Text>
//           <Image
//             source={require("../Assets/Robot_1.png")}
//             style={styles.image}
//           />
//           <Text style={styles.header}>Vår visjon</Text>
//           <Text style={styles.text}>
//             I en verden hvor tilgangen til helsehjelp stadig utfordres av både
//             tid og sted, er vår visjon å bringe fysioterapien hjem til deg.
//             PhysioFlow ble grunnlagt med en formening om at alle fortjener
//             tilgang til kvalitetsmessig fysioterapi, uavhengig av hvor de
//             befinner seg.
//           </Text>
//           <Text style={styles.header}>Hvordan PhysioFlow fungerer</Text>
//           <Text style={styles.bulletPoints}>Personlig tilpasning:</Text>
//           <Text style={styles.text}>
//             Når du laster ned PhysioFlow-appen og oppretter din profil, blir du
//             bedt om å dele informasjon om din fysiske tilstand, dine mål og
//             eventuelle smerter eller skader. Denne informasjonen danner
//             grunnlaget for din personlige rehabiliteringsplan.
//           </Text>

//           <Text style={styles.bulletPoints}>
//             Tilgjengelighet og fleksibilitet:
//           </Text>
//           <Text style={styles.text}>
//             Med PhysioFlow i lommen, har du tilgang til fysioterapi døgnet
//             rundt, uten behov for å tilpasse deg tidsskjemaer eller reise til en
//             klinikk. Enten du er hjemme, på jobb, eller på reise, gir vi deg
//             verktøyene du trenger for å jobbe mot bedre helse.
//           </Text>
//           <Image
//             source={require("../Assets/StretchOldMale.png")}
//             style={styles.image}
//           />
//           <Text style={styles.bulletPoints}>Din digitale fysioterapeut:</Text>
//           <Text style={styles.text}>
//             Gjennom appen vil du motta daglige treningsplaner,
//             instruksjonsvideoer og oppfølgingsverktøy som hjelper deg å holde
//             deg på sporet. AI-teknologien muliggjør også tilpasning av
//             programmet ditt over tid basert på din progresjon og eventuelle
//             tilbakemeldinger du gir.
//           </Text>

//           <Text style={styles.header}>Vårt team</Text>
//           <Text style={styles.text}>
//             Bak PhysioFlow står et dedikert team av fysioterapeuter,
//             dataforskere og teknologientusiaster, alle med et felles mål om å
//             gjøre rehabilitering så tilgjengelig og effektiv som mulig. Vi er
//             stolte av å kunne tilby en tjeneste som ikke bare leder an i
//             teknologisk innovasjon, men som også er dypt forankret i
//             profesjonell fysioterapipraksis.
//           </Text>
//           <Image
//             source={require("../Assets/Our_team.png")}
//             style={styles.image}
//           />
//         </ScrollView>
//       </View>
//       {/* <FooterNavigation /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: theme.spacing.large,
//     marginBottom: 70,
//   },
//   textContainer: {
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: "#FFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: theme.fontSize.title,
//     marginTop: 20,
//     fontWeight: "bold",
//     marginBottom: theme.spacing.medium,
//     textAlign: "center",
//   },
//   header: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: theme.spacing.medium,
//   },
//   text: {
//     fontSize: theme.fontSize.regular,
//     color: theme.colors.text,
//     marginBottom: theme.spacing.small,
//   },
//   button: {
//     padding: theme.spacing.medium,
//     backgroundColor: theme.colors.button,
//     borderRadius: theme.borderRadius.small,
//     marginTop: theme.spacing.large,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: theme.fontSize.regular,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   image: {
//     width: "100%", // eller en spesifikk bredde basert på ditt design
//     height: 300,
//     borderRadius: 10,
//     marginBottom: 20,
//     alignSelf: "center",
//   },
//   bulletPoints: {
//     fontSize: theme.fontSize.regular,
//     fontWeight: "bold",
//     marginBottom: theme.spacing.small,
//     marginTop: theme.spacing.medium,
//     color: theme.colors.text,
//   },
// });
// export default AboutScreen;
