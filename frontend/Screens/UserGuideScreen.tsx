//Navigasjonen her er ulik de andre sidene med navigate. Her er det satt opp en Const

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../Components/CustomButton/CustomButton";

const UserGuideScreen: React.FC = () => {
	const navigation = useNavigation();

	const handleAboutPress = () => {
		navigation.navigate("AboutScreen");
	};

	const handleContactPress = () => {
		navigation.navigate("ContactScreen");
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Velkommen til PhysoFlow!</Text>

			<Text style={styles.heading}>Oppsett av fokusområder</Text>
			<Text style={styles.text}>
				1. Identifiser dine smerteområder: Start med å velge områder på kroppen
				hvor du opplever smerte eller ubehag.
			</Text>
			<Text style={styles.text}>
				2. Tilpasning: Basert på dine valg, tilpasser PhysioFlow et tøye og
				rehabiliteringsprogram spesielt utformet for å målrette dine
				fokusområder og lindre smerte.
			</Text>

			<Text style={styles.heading}>Utføre tøyeøvelser</Text>
			{/* <Text style={styles.text}>
        - Daglige øvelsesforslag: Få anbefalinger for øvelser som passer for
        dine fokusområder, komplett med instruksjonsvideoer og guider.
      </Text> */}
			<Text style={styles.text}>
				- Instruksjoner og videoer: Sørg for riktig utførelse ved å følge
				detaljerte instruksjoner og animasjoner.
			</Text>
			{/* <Text style={styles.text}>
        - Tidtakning: Bruk appens tidtakerfunksjon for å overvåke varigheten av
        hver øvelse for maksimal effektivitet.
      </Text> */}

			<Text style={styles.heading}>Registrering av treningsøkter</Text>
			<Text style={styles.text}>
				- Loggfør økter: Etter hver treningsøkt, kan du registrere detaljer som
				øvelser utført, varighet, og personlige notater om din opplevelse.
			</Text>
			<Text style={styles.text}>
				- Spor fremgang: Følg med på din treningshistorikk og analyser din
				fremgang gjennom intuitive rapporter og analyser.
			</Text>

			<Text style={styles.heading}>Kontakt din behandler</Text>
			<Text style={styles.text}>
				- Meldingstjeneste: PhysioFlow sin innebygde meldingstjeneste lar deg
				enkelt kommunisere med din behandler for rådgivning eller veiledning.
			</Text>
			<Text style={styles.text}>
				- Del din fremgang: Med din tillatelse, kan du dele treningslogger og
				fremgangsrapporter med din behandler for tilpasset veiledning.
			</Text>

			<Text style={styles.heading}>Ekstra funksjoner</Text>

			<Text style={styles.text}>
				- Justering av program: Du kan når som helst justere ditt øvelsesprogram
				basert på endringer i dine fokusområder eller ut fra din helsetilstand.
			</Text>

			<View style={styles.buttonContainer}>
				<CustomButton onPress={handleAboutPress} title="Om oss" />
				<CustomButton onPress={handleContactPress} title="Kontakt oss" />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		marginBottom: 10,
		lineHeight: 24,
	},
	buttonContainer: {
		marginTop: 20,
		marginBottom: 30,
	},
});

export default UserGuideScreen;
