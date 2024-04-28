// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Alert,
//   StyleSheet,
// } from 'react-native';
// import { openComposer } from 'react-native-email-link';
// import CustomButton from "../Components/CustomButton/CustomButton";
// import { InputField } from "../Components/CustomInput/CustomInput";
// import { theme } from "../theme";

// const ContactScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendEmail = () => {
//     if (!name.trim() || !email.trim() || !message.trim()) {
//       Alert.alert("Feil", "Alle felt må fylles ut.");
//       return;
//     }
//     openComposer({
//       to: 'bobAI_saeed@hotmail.com',
//       subject: 'Henvendelse fra app',
//       body: `Navn: ${name}\nEpost: ${email}\nTelefon: ${phone}\nMelding: ${message}`
//     });
//   };

  // return (
  //   <KeyboardAvoidingView
  //     style={{ flex: 1 }}
  //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //     keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
  //     <ScrollView style={styles.container}>
  //     <View style={styles.formContainer}> 
  //       <Text style={styles.headerText}>Kontakt oss ☎️</Text>
  //       <InputField
  //         label="Navn"
  //         value={name}
  //         onChangeText={setName}
  //         style={styles.input}
  //       />
  //       <InputField
  //         label="E-post"
  //         value={email}
  //         onChangeText={setEmail}
  //         keyboardType="email-address"
  //         style={styles.input}
  //       />
  //       <InputField
  //         label="Mobilnummer"
  //         value={phone}
  //         onChangeText={setPhone}
  //         keyboardType="phone-pad"
  //         style={styles.input}
  //       />
//         <InputField
//           label="Hva kan vi hjelpe deg med?"
//           value={message}
//           onChangeText={setMessage}
//           multiline
//           numberOfLines={10}
//           style={styles.textArea}
//         />
//         <CustomButton
//           title="Send melding "
//           onPress={handleSendEmail}
//           iconName="send"
//         />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: theme.colors.primary,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 1,
//   },
//   textArea: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     textAlignVertical: "top",
//     marginBottom: 20,
//     height: 150,
//   },
//   formContainer: {
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     marginTop: 20,
//     borderRadius: 8,
//     marginBottom: 15,
//     alignItems: 'center',
//   },
// });

// export default ContactScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { openComposer } from 'react-native-email-link';
import CustomButton from "../Components/CustomButton/CustomButton";
import { InputField } from "../Components/CustomInput/CustomInput"; 
import { theme } from "../theme";

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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView style={styles.container}>
      <View style={styles.formContainer}> 
        <Text style={styles.headerText}>Kontakt oss</Text>
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
          title="Send melding til PhysioFlow"
          onPress={handleSendEmail}
          iconName="send"
        />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
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
    height: 150, 
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  charCount: {
    textAlign: 'right',
    marginBottom: 10,
    fontSize: 12,
    color: theme.colors.secondary,
  },
});

export default ContactScreen;
