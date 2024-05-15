import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import CustomModal from '../../../Components/CustomModal/CustomModal';
import { frontScreenStyles as styles } from '../FrontScreen_Style';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ visible, onClose }) => {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Physio Flow"
      containerStyle={{ width: 350, height: 600 }}
    >
      <ScrollView>
        <Text style={styles.text}>
          Velkommen til PhysioFlow - din digitale partner for fysioterapi og rehabilitering, når og hvor det passer deg.
        </Text>
        <Text style={styles.text}>
          Ved å kombinere det nyeste innen kunstig intelligens (AI) med ekspertisen til vårt team av fysioterapeuter, har vi skapt en unik plattform designet for å gi deg personlig tilpasset veiledning og støtte gjennom din rehabiliteringsreise.
        </Text>
        <Image
          source={require('../../../Assets/Robot.png')}
          style={styles.modalImage}
          accessibilityLabel="Robot"
        />
        <Text style={styles.heading}>Vår visjon</Text>
        <Text style={styles.text}>
          I en verden hvor tilgangen til helsehjelp stadig utfordres av både tid og sted, er vår visjon å bringe fysioterapien hjem til deg. PhysioFlow ble grunnlagt med en formening om at alle fortjener tilgang til kvalitetsmessig fysioterapi, uavhengig av hvor de befinner seg.
        </Text>
        <Text style={styles.heading}>Hvordan PhysioFlow fungerer</Text>
        <Text style={styles.bulletPoints}>Personlig tilpasning:</Text>
        <Text style={styles.text}>
          Når du laster ned PhysioFlow-appen og oppretter din profil, blir du bedt om å dele informasjon om din fysiske tilstand, dine mål og eventuelle smerter eller skader. Denne informasjonen danner grunnlaget for din personlige rehabiliteringsplan.
        </Text>
        <Text style={styles.bulletPoints}>Tilgjengelighet og fleksibilitet:</Text>
        <Text style={styles.text}>
          Med PhysioFlow i lommen, har du tilgang til fysioterapi døgnet rundt, uten behov for å tilpasse deg tidsskjemaer eller reise til en klinikk. Enten du er hjemme, på jobb, eller på reise, gir vi deg verktøyene du trenger for å jobbe mot bedre helse.
        </Text>
        <Image
          source={require('../../../Assets/StretchOldMale.png')}
          style={styles.modalImage}
          accessibilityLabel="Stretching male old"
        />
        <Text style={styles.bulletPoints}>Din digitale fysioterapeut:</Text>
        <Text style={styles.text}>
          Gjennom appen vil du motta daglige treningsplaner, instruksjonsvideoer og oppfølgingsverktøy som hjelper deg å holde deg på sporet. AI-teknologien muliggjør også tilpasning av programmet ditt over tid basert på din progresjon og eventuelle tilbakemeldinger du gir.
        </Text>
        <Text style={styles.heading}>Vårt team</Text>
        <Text style={styles.text}>
          Bak PhysioFlow står et dedikert team av fysioterapeuter, dataforskere og teknologientusiaster, alle med et felles mål om å gjøre rehabilitering så tilgjengelig og effektiv som mulig. Vi er stolte av å kunne tilby en tjeneste som ikke bare leder an i teknologisk innovasjon, men som også er dypt forankret i profesjonell fysioterapipraksis.
        </Text>
        <Image
          source={require('../../../Assets/Our_team.png')}
          style={styles.modalImage}
          accessibilityLabel="Our team"
        />
      </ScrollView>
    </CustomModal>
  );
};

export default AboutModal;
