import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../Styles/ContactScreen_Style";
import CustomButton from "../Components/CustomButton/CustomButton";

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');


  const handleSendPress = () => {
  //  Her må vi legge til logikk for mottak av informasjon 
  };

  return (
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
        title="Send"
        onPress={handleSendPress}
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
  );
};

export default ContactScreen;