import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const TermsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptTerms = async () => {
    if (isAccepted) {
      await AsyncStorage.setItem("termsAccepted", "true");
      navigation.goBack();
    } else {
      Alert.alert(
        "Vilkår må aksepteres",
        "Du må godta vilkårene for å fortsette."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vilkår for bruk</Text>
      <Text style={styles.text}>
        Ved å bruke vår applikasjon og tjenester, aksepterer du følgende vilkår
        og betingelser.
      </Text>

      <Text style={styles.header}>Brukerkonto</Text>
      <Text style={styles.text}>
        For å få tilgang til visse funksjoner på vår plattform, kan det hende du
        må opprette en konto. Du er ansvarlig for å opprettholde
        konfidensialiteten til din konto og passord og for å informere oss
        umiddelbart om uautorisert bruk av din konto.
      </Text>

      <Text style={styles.header}>Brukerrettigheter og -forpliktelser</Text>
      <Text style={styles.text}>
        Som bruker har du rett til å bruke nettstedet i henhold til de regler og
        retningslinjer som er utarbeidet. Du skal ikke bruke nettstedet til
        ulovlige formål.
      </Text>

      <Text style={styles.header}>Immaterielle rettigheter</Text>
      <Text style={styles.text}>
        Innholdet i PhysioFlow, inkludert tekst, grafikk, logoer og annet, er
        beskyttet av opphavsrett og tilhører PhysioFlow eller våre lisensgivere.
        Du kan ikke kopiere, reprodusere, gjenutgi, laste ned eller distribuere
        noe innhold uten forutgående skriftlig tillatelse fra oss.
      </Text>

      <Text style={styles.header}>Ansvarsfraskrivelse</Text>
      <Text style={styles.text}>
        Våre tjenester leveres "som de er" uten noen form for garantier. Vi
        fraskriver oss ansvar for eventuelle direkte, indirekte skader som følge
        av din bruk av vår plattform.
      </Text>

      <Text style={styles.header}>Endringer i vilkår</Text>
      <Text style={styles.text}>
        Vi forbeholder oss retten til å endre eller erstatte disse
        Brukervilkårene når som helst. Hvis de reviderte vilkårene innebærer en
        vesentlig endring, vil vi gjøre vårt beste for å varsle deg på forhånd.
      </Text>

      <Text style={styles.header}>Jurisdiksjon</Text>
      <Text style={styles.text}>
        Disse vilkårene skal styres av og tolkes i samsvar med lovgivningen i
        Norge, uten hensyn til prinsipper om lovkonflikter.
      </Text>

      <Text style={styles.header}>Kontaktinformasjon</Text>
      <Text style={styles.text}>
        For spørsmål om disse brukervilkårene, vennligst kontakt oss på
        bobai@physioflow.no.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
    textAlign: "center",
  },
  header: {
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

  buttonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.regular,
    fontWeight: "bold",
  },
});

export default TermsScreen;
