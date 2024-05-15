import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import CustomModal from '../../../Components/CustomModal/CustomModal';
import { frontScreenStyles as styles } from '../FrontScreen_Style';

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ visible, onClose }) => {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Velkommen til PhysioFlow!"
      containerStyle={{ width: 350, height: 600 }}
    >
      <ScrollView>
        <Text style={styles.heading}>Oppsett av fokusområder</Text>
        <Text style={styles.text}>
          1. Identifiser dine smerteområder: Start med å velge områder på kroppen hvor du opplever smerte eller ubehag.
        </Text>
        <Text style={styles.text}>
          2. Tilpasning: Basert på dine valg, tilpasser PhysioFlow et tøye og rehabiliteringsprogram spesielt utformet for å målrette dine fokusområder og lindre smerte.
        </Text>
        <Text style={styles.heading}>Utføre tøyeøvelser</Text>
        <Text style={styles.text}>
          - Instruksjoner og videoer: Sørg for riktig utførelse ved å følge detaljerte instruksjoner og animasjoner.
        </Text>
        <Image
          source={require('../../../Assets/StretchMale.png')}
          style={styles.modalImage}
          accessibilityLabel="Stretching male"
        />
        <Text style={styles.heading}>Registrering av treningsøkter</Text>
        <Text style={styles.text}>
          - Loggfør økter: Etter hver treningsøkt, kan du registrere detaljer som øvelser utført, varighet, og personlige notater om din opplevelse.
        </Text>
        <Text style={styles.text}>
          - Spor fremgang: Følg med på din treningshistorikk og analyser din fremgang gjennom intuitive rapporter og analyser.
        </Text>
        <Text style={styles.heading}>Kontakt din behandler</Text>
        <Text style={styles.text}>
          - Meldingstjeneste: PhysioFlow sin innebygde meldingstjeneste lar deg enkelt kommunisere med din behandler for rådgivning eller veiledning.
        </Text>
        <Text style={styles.text}>
          - Del din fremgang: Med din tillatelse, kan du dele treningslogger og fremgangsrapporter med din behandler for tilpasset veiledning.
        </Text>
        <Text style={styles.heading}>Ekstra funksjoner</Text>
        <Text style={styles.text}>
          - Justering av program: Du kan når som helst justere ditt øvelsesprogram basert på endringer i dine fokusområder eller ut fra din helsetilstand.
        </Text>
      </ScrollView>
    </CustomModal>
  );
};

export default HelpModal;
