import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    iconName: string;
}

const CustomButton = ({ title, onPress, iconName }: CustomButtonProps) => {
  return (
    <Button
      buttonStyle={styles.button}
      containerStyle={styles.buttonContainer}
      icon={<Icon name={iconName} size={15} color="#0FF" />}
      onPress={onPress}
      title={title}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
  },
  buttonContainer: {
    margin: 5,
  },
});

export default CustomButton;
