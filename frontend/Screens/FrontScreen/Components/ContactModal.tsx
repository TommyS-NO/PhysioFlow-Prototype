import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import CustomModal from '../../../Components/CustomModal/CustomModal';
import { frontScreenStyles as styles } from '../FrontScreen_Style';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Kontakt oss"
      containerStyle={{ width: 350, height: 600 }}
    >
      <ScrollView>
        <Text style={styles.heading}>Kontakt oss gjerne for ytterligere informasjon:</Text>
        <Text style={styles.bulletPoints}>
          <Text style={styles.boldText}>Telefon:</Text> 123-456-7890
        </Text>
        <Text style={styles.bulletPoints}>
          <Text style={styles.boldText}>E-post:</Text> contact@example.com
        </Text>
        <Text style={styles.bulletPoints}>
          <Text style={styles.boldText}>Adresse:</Text> Eksempelveien 123, 0123 Sted
        </Text>
        <Image
          source={require('../../../Assets/Telephone.png')}
          style={styles.modalImage}
          accessibilityLabel="Person on the phone"
        />
      </ScrollView>
    </CustomModal>
  );
};

export default ContactModal;
