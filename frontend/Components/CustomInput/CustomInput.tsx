import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

export interface InputFieldProps extends TextInputProps {
  label?: string;
}

export const InputField = ({ label, ...props }: InputFieldProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 4,
    padding: 8,
    height: 40,
  },
});
