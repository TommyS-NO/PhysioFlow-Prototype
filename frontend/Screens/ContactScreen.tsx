import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openComposer } from 'react-native-email-link';
import { styles } from "../Styles/ContactScreen_Style";
import CustomButton from "../Components/CustomButton/CustomButton";

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Feil", "Alle felt må fylles ut.");
      return;
    }

    // Her må vi prøve å sette opp en serverløsning slik at bruker slipper at henvendelsen må gå via mailen og ikke direkte fra appen. 
    openComposer({
      to: 'bobAI_saeed@hotmail.com',
      subject: 'Henvendelse fra app',
      body: `Navn: ${name}\nEpost: ${email}\nTelefon: ${phone}\nMelding: ${message}`
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Kontakt oss</Text>
        <TextInput
          style={styles.input}
          placeholder="Navn"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Epost-adresse"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobilnummer"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.textArea}
          placeholder="Din melding"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={10}
        />
        <CustomButton
          title="Send melding til PhysioFlow"
          onPress={handleSendEmail}
          iconName="send"
          buttonStyle={styles.sendButton}
          titleStyle={styles.sendButtonText}
        />
        <View style={styles.iconContainer}>
          <Icon name="linkedin-square" size={30} style={styles.icon} />
          <Icon name="phone-square" size={30} style={styles.icon} />
          <Icon name="facebook-square" size={30} style={styles.icon} />
          <Icon name="instagram" size={30} style={styles.icon} />
          <Icon name="twitter-square" size={30} style={styles.icon} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactScreen;
