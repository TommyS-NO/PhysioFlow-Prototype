import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import { openComposer } from 'react-native-email-link';
import CustomButton from "../Components/CustomButton/CustomButton";
import { InputField } from "../Components/CustomInput/CustomInput"; 
import { theme } from "../theme";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FooterNavigation from "../Components/FooterNavigation/FooterNavigation";

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChar = 500;

  const handleTextChange = (text) => {
    if (text.length <= maxChar) {
      setMessage(text);
      setCharCount(text.length);
    } else {
      Alert.alert("Maksimal lengde", "Du har nådd den maksimale lengden på meldingen.");
    }
  };

  const handleSendEmail = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      Alert.alert("Feil", "Alle felt må fylles ut.");
      return;
    }
//Klarer vi å sette en funksjon som gjør at meldingen kan sendes direkte fra appen?
    openComposer({
      to: 'bobAI_saeed@hotmail.com',
      subject: 'Henvendelse fra app',
      body: `Navn: ${name}\nEpost: ${email}\nTelefon: ${phone}\nMelding: ${message}`
    });
  };

  return (
    <View style={styles.container}>
   
    <KeyboardAwareScrollView
      style={{ }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <View style={styles.formContainer}> 
        <Text style={styles.headerText}>Kontakt oss ☎️</Text>
        <InputField
          label="Navn:"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <InputField
          label="E-post:"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <InputField
          label="Mobilnummer:"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <InputField
          label="Hva kan vi hjelpe deg med?"
          value={message}
          onChangeText={handleTextChange}
          multiline
          numberOfLines={10}
          style={styles.textArea}
        />
        <Text style={styles.charCount}>{maxChar - charCount} tegn igjen</Text>
        <CustomButton
          title="Send melding"
          onPress={handleSendEmail}
          iconName="send"
        />
        </View>
  
        </KeyboardAwareScrollView>
        <FooterNavigation />
        </View>
        
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlignVertical: "top", 
    height: 90, 
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    margin: 25,
    alignItems: 'center',

  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: theme.colors.secondary,
    marginBottom: 15,
  },
});

export default ContactScreen;
