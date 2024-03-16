import React from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";

const AboutScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>FysioGO!</Text>
      <Text style={styles.text}>
        Velkommen til FysioGO - din digitale partner for fysioterapi og
        rehabilitering, når og hvor det passer deg. Ved å kombinere det nyeste
        innen kunstig intelligens (AI) med ekspertisen til vårt team av
        fysioterapeuter, har vi skapt en unik plattform designet for å gi deg
        personlig tilpasset veiledning og støtte gjennom din
        rehabiliteringsreise.
      </Text>
      <Image source={require("../Assets/Robot_1.png")} style={styles.image} />
      <Text style={styles.heading}>Vår visjon</Text>
      <Text style={styles.text}>
        I en verden hvor tilgangen til helsehjelp stadig utfordres av både tid
        og sted, er vår visjon å bringe fysioterapien hjem til deg. FysioGO ble
        grunnlagt med troen på at alle fortjener tilgang til kvalitetsmessig
        fysioterapi, uavhengig av hvor de befinner seg. Vi ønsker å bryte ned
        barrierene som holder mennesker fra å oppnå optimal fysisk helse ved å
        utnytte kraften i teknologi.
      </Text>
      <Text style={styles.heading}>Hvordan FysioGO! fungerer</Text>
      <Text style={styles.text}>
        Personlig tilpasning: Når du laster ned FysioGO-appen og oppretter din
        profil, blir du bedt om å dele informasjon om din fysiske tilstand, dine
        mål og eventuelle smerter eller skader. Denne informasjonen danner
        grunnlaget for din personlige rehabiliteringsplan.{" "}
      </Text>

      <Text style={styles.text}>
        AI-drevet analyse: Vår AI-teknologi analyserer informasjonen du har
        oppgitt for å lage et skreddersydd trenings- og rehabiliteringsprogram
        som er optimalt for nettopp deg. Denne tilnærmingen sikrer at du får
        mest mulig relevant og effektiv behandling for dine spesifikke behov.{" "}
      </Text>

      <Text style={styles.text}>
        Din digitale fysioterapeut: Gjennom appen vil du motta daglige
        treningsplaner, instruksjonsvideoer og oppfølgingsverktøy som hjelper
        deg å holde deg på sporet. AI-teknologien muliggjør også tilpasning av
        programmet ditt over tid basert på din progresjon og eventuelle
        tilbakemeldinger du gir.
      </Text>

      <Text style={styles.text}>
        Tilgjengelighet og fleksibilitet: Med FysioGO i lommen, har du tilgang
        til fysioterapi døgnet rundt, uten behov for å tilpasse deg tidsskjemaer
        eller reise til en klinikk. Enten du er hjemme, på jobb, eller på reise,
        gir vi deg verktøyene du trenger for å jobbe mot bedre helse.
      </Text>
      <Text style={styles.heading}>Vårt team</Text>
      <Text style={styles.text}>
        Bak FysioGO står et dedikert team av fysioterapeuter, dataforskere og
        teknologientusiaster, alle med et felles mål om å gjøre rehabilitering
        så tilgjengelig og effektiv som mulig. Vi er stolte av å kunne tilby en
        tjeneste som ikke bare leder an i teknologisk innovasjon, men som også
        er dypt forankret i profesjonell fysioterapipraksis.
      </Text>
      <Image source={require("../Assets/Our_team.png")} style={styles.image} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,

    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  //Husk å justere alle bildene hver for seg slik at det blir riktige størrelser på de ulike
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,

    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AboutScreen;