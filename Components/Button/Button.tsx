import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  iconName: string;
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, iconName, buttonStyle, titleStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Icon name={iconName} size={20} color={theme.colors.icon} style={styles.icon} />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.button, 
    width: 150,
    margin: theme.spacing.small,
  },
  title: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.text, 
  },
  icon: {
    marginRight: theme.spacing.small, 
  },
});

export default CustomButton;
