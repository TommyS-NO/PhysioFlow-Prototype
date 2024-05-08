import React from "react";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
import FooterNavigation from "../Components/FooterNavigation/FooterNavigation";


const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>PhysioFlow</Text>
      <Text style={styles.text}>
        Velkommen til PhysioFlow- din digitale partner for fysioterapi og
        rehabilitering, når og hvor det passer deg.{" "}
      </Text>
      <Text style={styles.text}>
        Ved å kombinere det nyeste innen kunstig intelligens (AI) med
        ekspertisen til vårt team av fysioterapeuter, har vi skapt en unik
        plattform designet for å gi deg personlig tilpasset veiledning og støtte
        gjennom din rehabiliteringsreise.
      </Text>
      <Image
        source={require("../Assets/Robot_1.png")}
        style={styles.welcomeImage}
      />
      <Text style={styles.heading}>Vår visjon</Text>
      <Text style={styles.text}>
        I en verden hvor tilgangen til helsehjelp stadig utfordres av både tid
        og sted, er vår visjon å bringe fysioterapien hjem til deg. PhysioFlow
        ble grunnlagt med en formening om at alle fortjener tilgang til
        kvalitetsmessig fysioterapi, uavhengig av hvor de befinner seg.
      </Text>
      <Text style={styles.heading}>Hvordan PhysioFlow fungerer</Text>
      <Text style={styles.bulletPoints}>Personlig tilpasning:</Text>
      <Text style={styles.text}>
        Når du laster ned PhysioFlow-appen og oppretter din profil, blir du bedt
        om å dele informasjon om din fysiske tilstand, dine mål og eventuelle
        smerter eller skader. Denne informasjonen danner grunnlaget for din
        personlige rehabiliteringsplan.
      </Text>
	
      <Text style={styles.bulletPoints}>Tilgjengelighet og fleksibilitet:</Text>
      <Text style={styles.text}>
        Med PhysioFlow i lommen, har du tilgang til fysioterapi døgnet rundt,
        uten behov for å tilpasse deg tidsskjemaer eller reise til en klinikk.
        Enten du er hjemme, på jobb, eller på reise, gir vi deg verktøyene du
        trenger for å jobbe mot bedre helse.
      </Text>
	  <Image
        source={require("../Assets/StretchOldMale.png")}
        style={styles.teamImage}
      />
      <Text style={styles.bulletPoints}>Din digitale fysioterapeut:</Text>
      <Text style={styles.text}>
        Gjennom appen vil du motta daglige treningsplaner, instruksjonsvideoer
        og oppfølgingsverktøy som hjelper deg å holde deg på sporet.
        AI-teknologien muliggjør også tilpasning av programmet ditt over tid
        basert på din progresjon og eventuelle tilbakemeldinger du gir.
      </Text>

      <Text style={styles.heading}>Vårt team</Text>
      <Text style={styles.text}>
        Bak PhysioFlow står et dedikert team av fysioterapeuter, dataforskere og
        teknologientusiaster, alle med et felles mål om å gjøre rehabilitering
        så tilgjengelig og effektiv som mulig. Vi er stolte av å kunne tilby en
        tjeneste som ikke bare leder an i teknologisk innovasjon, men som også
        er dypt forankret i profesjonell fysioterapipraksis.
      </Text>
      <Image
        source={require("../Assets/Our_team.png")}
        style={styles.teamImage}
      />
    </ScrollView>
     <FooterNavigation />
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  bulletPoints: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  welcomeImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  teamImage: {
    width: 350,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default AboutScreen;
