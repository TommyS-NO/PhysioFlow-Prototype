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
	title: string;
	onPress: () => void;
	iconName?: string;
	buttonStyle?: ViewStyle;
	titleStyle?: TextStyle;
	disabled?: boolean;
	size?: "small" | "medium" | "large";
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	iconName,
	buttonStyle,
	titleStyle,
	disabled = false,
	size = "large",
}) => {
	const buttonSizeStyle = styles[size];
	const buttonColorStyle = disabled ? styles.disabled : styles[`${size}Color`];

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.button,
				buttonSizeStyle,
				buttonColorStyle,
				buttonStyle,
				disabled ? styles.disabled : {},
			]}
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
		width: "100%",
		alignSelf: "center",
		borderRadius: theme.borderRadius.medium,
		margin: theme.spacing.small,
		paddingHorizontal: theme.spacing.medium,
	},
	large: {
		paddingVertical: theme.spacing.medium,
	},
	medium: {
		paddingVertical: theme.spacing.medium - 4,
		width: "60%",
	},
	small: {
		paddingVertical: theme.spacing.small,
		width: "75%",
	},
	largeColor: {
		backgroundColor: theme.colors.button,
	},
	mediumColor: {
		backgroundColor: theme.colors.primaryButton,
	},
	smallColor: {
		backgroundColor: theme.colors.primaryButton,
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
