// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
// biome-ignore lint/style/useImportType: <explanation>
import {
	Modal,
	StyleSheet,
	View,
	Text,
	ViewStyle,
	ModalProps,
} from "react-native";
import CustomButton from "../CustomButton/CustomButton";

interface ButtonProps {
	id?: string;
	title: string;
	onPress: () => void;
	style?: ViewStyle;
}

interface CustomModalProps
	extends Omit<ModalProps, "visible" | "onRequestClose"> {
	visible: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	buttons?: ButtonProps[];
	style?: ViewStyle;
}

const CustomModal: React.FC<CustomModalProps> = ({
	visible,
	onClose,
	title,
	children,
	buttons,
	style,
}) => (
	<Modal
		visible={visible}
		transparent
		animationType="slide"
		onRequestClose={onClose}
	>
		<View style={styles.centeredView}>
			<View style={[styles.modalView, style]}>
				<Text style={styles.modalTitle}>{title}</Text>
				{children}
				{buttons?.map((button, index) => (
					<CustomButton
						key={button.id || index}
						title={button.title}
						onPress={button.onPress}
						buttonStyle={button.style}
					/>
				))}
				{!buttons && <CustomButton title="Lukk" onPress={onClose} />}
			</View>
		</View>
	</Modal>
);

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
});

export default CustomModal;
