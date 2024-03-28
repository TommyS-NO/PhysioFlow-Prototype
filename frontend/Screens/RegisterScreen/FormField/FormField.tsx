import React from "react";
import {
	InputField,
	InputFieldProps,
} from "../../../Components/CustomInput/CustomInput";
import GenderSelection, {
	GenderSelectionProps,
} from "../GenderSelection/GenderSelection";
import {
	PickerComponent,
	PickerComponentProps,
} from "../Picker/PickerComponent";
import NumberSpinner, {
	NumberSpinnerProps,
} from "../Picker/NumberSpinner";

type ExtendedInputFieldProps = InputFieldProps & { errorMessage?: string };

type FormFieldProps =
	| ({ type: "text" } & ExtendedInputFieldProps)
	| ({ type: "gender" } & GenderSelectionProps)
	| ({ type: "picker" } & PickerComponentProps)
	| ({ type: "number" } & NumberSpinnerProps);

export const FormField: React.FC<FormFieldProps> = (props) => {
	switch (props.type) {
		case "text":
			return <InputField {...(props as InputFieldProps)} />;
		case "gender":
			return <GenderSelection {...(props as GenderSelectionProps)} />;
		case "picker":
			return <PickerComponent {...(props as PickerComponentProps)} />;
		case "number":
			return <NumberSpinner {...(props as NumberSpinnerProps)} />;
		default:
			return null;
	}
};

export default FormField;
