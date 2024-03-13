import React from "react";
import { CheckBox } from "react-native-elements";
import { ViewStyle } from "react-native";

interface CustomCheckBoxProps {
	title: string;
	checked: boolean;
	onPress: () => void;
	containerStyle?: ViewStyle;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
	title,
	checked,
	onPress,
	containerStyle,
}) => {
	return (
		<CheckBox
			title={title}
			checked={checked}
			onPress={onPress}
			containerStyle={containerStyle}
			// legge til flere stiler eller props for å tilpasse
		/>
	);
};

export default CustomCheckBox;
