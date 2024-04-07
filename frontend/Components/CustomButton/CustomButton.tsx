import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle,
	TextStyle,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../theme";

interface CustomButtonProps {
	title?: string;
	onPress: () => void;
	iconName?: string;
	buttonStyle?: ViewStyle;
	titleStyle?: TextStyle;
	disabled?: boolean;
}

const CustomButton = ({
	title,
	onPress,
	iconName,
	buttonStyle,
	titleStyle,
	disabled = false,
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.button, buttonStyle, disabled ? styles.disabled : {}]}
			disabled={disabled}
		>
			{iconName && (
				<Icon
					name={iconName}
					size={20}
					color={disabled ? theme.colors.disabled : theme.colors.icon}
					style={styles.icon}
				/>
			)}
			<Text
				style={[styles.title, titleStyle, disabled ? styles.disabledTitle : {}]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: theme.spacing.medium,
		paddingHorizontal: theme.spacing.medium,
		backgroundColor: theme.colors.button,
		width: "100%",
		alignSelf: "center",
		margin: theme.spacing.small,
		marginHorizontal: 4,
		borderRadius: theme.borderRadius.medium,
	},
	title: {
		fontSize: theme.fontSize.regular,
		color: theme.colors.buttonText,
	},
	icon: {
		marginRight: theme.spacing.small,
	},
	disabled: {
		backgroundColor: theme.colors.disabled,
	},
	disabledTitle: {
		color: theme.colors.disabledText,
	},
});

export default CustomButton;
