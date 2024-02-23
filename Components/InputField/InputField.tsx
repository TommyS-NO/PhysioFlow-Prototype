import React from "react";
import {
	TextInput,
	TextInputProps,
	StyleSheet,
	NativeSyntheticEvent,
	TextInputEndEditingEventData,
} from "react-native";
import { inputFieldStyles } from "../../Styles/InputField_Style";

interface InputFieldProps extends TextInputProps {
	validator?: (input: string) => boolean;
	onValidation?: (isValid: boolean) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
	validator,
	onValidation,
	style,
	...props
}) => {
	const handleEndEditing = (
		e: NativeSyntheticEvent<TextInputEndEditingEventData>,
	) => {
		const isValid = validator ? validator(e.nativeEvent.text) : true;
		if (onValidation) {
			onValidation(isValid);
		}
	};

	return (
		<TextInput
			style={[inputFieldStyles.input, style]}
			onEndEditing={validator ? handleEndEditing : undefined}
			{...props}
		/>
	);
};
