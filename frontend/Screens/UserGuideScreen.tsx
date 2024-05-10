//Navigasjonen her er ulik de andre sidene med navigate. Her er det satt opp en Const

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../Components/CustomButton/CustomButton";
import { theme } from "../theme";

const UserGuideScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleAboutPress = () => {
    navigation.navigate("AboutScreen");
  };

  const handleContactPress = () => {
    navigation.navigate("ContactScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Velkommen til PhysoFlow!</Text>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.heading}>Oppsett av fokusområder</Text>
          <Text style={styles.text}>
            1. Identifiser dine smerteområder: Start med å velge områder på
            kroppen hvor du opplever smerte eller ubehag.
          </Text>
          <Text style={styles.text}>
            2. Tilpasning: Basert på dine valg, tilpasser PhysioFlow et tøye og
            rehabiliteringsprogram spesielt utformet for å målrette dine
            fokusområder og lindre smerte.
          </Text>

          <Text style={styles.heading}>Utføre tøyeøvelser</Text>

          <Text style={styles.text}>
            - Instruksjoner og videoer: Sørg for riktig utførelse ved å følge
            detaljerte instruksjoner og animasjoner.
          </Text>

          <Text style={styles.heading}>Registrering av treningsøkter</Text>
          <Text style={styles.text}>
            - Loggfør økter: Etter hver treningsøkt, kan du registrere detaljer
            som øvelser utført, varighet, og personlige notater om din
            opplevelse.
          </Text>
          <Text style={styles.text}>
            - Spor fremgang: Følg med på din treningshistorikk og analyser din
            fremgang gjennom intuitive rapporter og analyser.
          </Text>

          <Text style={styles.heading}>Kontakt din behandler</Text>
          <Text style={styles.text}>
            - Meldingstjeneste: PhysioFlow sin innebygde meldingstjeneste lar
            deg enkelt kommunisere med din behandler for rådgivning eller
            veiledning.
          </Text>
          <Text style={styles.text}>
            - Del din fremgang: Med din tillatelse, kan du dele treningslogger
            og fremgangsrapporter med din behandler for tilpasset veiledning.
          </Text>

          <Text style={styles.heading}>Ekstra funksjoner</Text>

          <Text style={styles.text}>
            - Justering av program: Du kan når som helst justere ditt
            øvelsesprogram basert på endringer i dine fokusområder eller ut fra
            din helsetilstand.
          </Text>

          <View style={styles.buttonContainer}>
            <CustomButton onPress={handleAboutPress} title="Om oss" />
            <CustomButton onPress={handleContactPress} title="Kontakt oss" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
  },
  textContainer: {
    flex: 1,
    padding: theme.spacing.large,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
    textAlign: "center",
  },
  heading: {
    fontSize: theme.fontSize.regular,
    fontWeight: "bold",
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.small,
  },
  text: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default UserGuideScreen;
