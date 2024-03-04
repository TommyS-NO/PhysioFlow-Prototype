import React from "react";
import { Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { customButtonStyles } from "../../Styles/CustomButton_Style";
import { theme } from "../../theme";

interface CustomButtonProps {
	title?: string;
	onPress: () => void;
	iconName?: string;
	buttonStyle?: ViewStyle;
	titleStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	iconName,
	buttonStyle,
	titleStyle,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[customButtonStyles.button, buttonStyle]}
		>
			{iconName && (
				<Icon
					name={iconName}
					size={20}
					color={theme.colors.icon}
					style={customButtonStyles.icon}
				/>
			)}
			<Text style={[customButtonStyles.title, titleStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;