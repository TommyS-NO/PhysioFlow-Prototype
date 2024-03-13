import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import CustomButton from "../Components/CustomButton/CustomButton";
import CustomModal from "../Components/CustomModal/CustomModal";
import BodyChart from "../Components/BodyChart/bodyChart";
import FollowUpQuestion from "../Components/FollowUP/FollowUP";

type FocusAreaKey =
	| "Hode/Nakke"
	| "Skulder"
	| "Albue"
	| "Håndledd/Hånd"
	| "Øvre rygg"
	| "Nedre rygg"
	| "Hofte"
	| "Kne"
	| "Ankel/Fot";

interface InjuryState {
	isNewInjury: boolean;
	isOldInjury: boolean;
	isRehabilitation: boolean;
	isOther: boolean;
}

const FocusAreaRegister: React.FC = () => {
	const [bodySide, setBodySide] = useState<"front" | "back">("front");
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [selectedAreas, setSelectedAreas] = useState<{
		[key in FocusAreaKey]?: InjuryState;
	}>({});
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [currentArea, setCurrentArea] = useState<FocusAreaKey | null>(null);

	useEffect(() => {
		if (currentStep === 1) {
			Alert.alert(
				"Instruksjoner",
				"Velg minst ett og maks tre fokusområder. Trykk på et område på kroppen for å velge.",
			);
		}
	}, [currentStep]);

	const handleAreaPress = (area: FocusAreaKey): void => {
		setCurrentArea(area);
		setIsModalVisible(true);
		if (!selectedAreas[area]) {
			setSelectedAreas((prevAreas) => ({
				...prevAreas,
				[area]: {
					isNewInjury: false,
					isOldInjury: false,
					isRehabilitation: false,
					isOther: false,
				},
			}));
		}
	};

	const handleFocusChange = (key: keyof InjuryState, value: boolean): void => {
		if (currentArea && selectedAreas[currentArea] !== undefined) {
			setSelectedAreas((prevState) => ({
				...prevState,
				[currentArea]: {
					...prevState[currentArea],
					[key]: value,
				},
			}));
		}
	};

	const closeModal = (): void => {
		setIsModalVisible(false);
	};

	const handleNextStep = (): void => {
		const selectedCount = Object.values(selectedAreas).filter(
			(area) =>
				area &&
				(area.isNewInjury ||
					area.isOldInjury ||
					area.isRehabilitation ||
					area.isOther),
		).length;
		if (selectedCount >= 1 && selectedCount <= 3) {
			setCurrentStep((prevStep) => prevStep + 1);
		} else {
			Alert.alert(
				"Feil valg",
				"Du må velge minst ett og maks tre fokusområder før du kan fortsette.",
			);
		}
	};

	const toggleBodySide = () => {
		setBodySide((prevBodySide) =>
			prevBodySide === "front" ? "back" : "front",
		);
	};

	// |-------------|
	// | Render  |
	// |-------------|

	const renderStepContent = (): JSX.Element | null => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<BodyChart
							bodySide={bodySide}
							onAreaPress={handleAreaPress}
							toggleBodySide={toggleBodySide}
						/>
						<CustomButton
							title="Neste"
							onPress={handleProceed}
							disabled={!isAnyCheckboxChecked()}
						/>
					</>
				);
			case 2:
				return (
					<FollowUpQuestion
						selectedAreas={selectedAreas}
						onContinue={(rehabTime, intensityLevel) => {
							handleNextStep();
						}}
					/>
				);
			case 3:
				return (
					<View style={styles.infoContainer}>
						<Text style={styles.infoText}>Takk for informasjonen!</Text>
						<Text style={styles.infoText}>
							Dine valg vil hjelpe oss med å tilpasse din rehabiliteringsplan.
						</Text>
					</View>
				);
			default:
				return null;
		}
	};
	const isAnyCheckboxChecked = () => {
		return Object.values(selectedAreas).some(
			(area) =>
				area?.isNewInjury ||
				area?.isOldInjury ||
				area?.isRehabilitation ||
				area?.isOther,
		);
	};

	const handleProceed = () => {
		if (isAnyCheckboxChecked()) {
			handleNextStep();
		} else {
			Alert.alert(
				"Handling nødvendig",
				"Velg minst ett fokusområde før du går videre.",
			);
		}
	};

	// |-------------|
	// |  Return |
	// |-------------|
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.content}>
				{renderStepContent()}
			</ScrollView>
			<CustomModal
				visible={isModalVisible}
				onClose={closeModal}
				title={currentArea ? currentArea.replace(/_/g, " ") : "Fokusområde"}
			>
				{currentArea && (
					<>
						<View style={styles.checkBoxContainer}>
							<View style={styles.checkBoxRow}>
								<CheckBox
									title="Ny skade"
									checked={selectedAreas[currentArea]?.isNewInjury || false}
									onPress={() =>
										handleFocusChange(
											"isNewInjury",
											!(selectedAreas[currentArea]?.isNewInjury || false),
										)
									}
								/>
								<CheckBox
									title="Gammel skade"
									checked={selectedAreas[currentArea]?.isOldInjury || false}
									onPress={() =>
										handleFocusChange(
											"isOldInjury",
											!(selectedAreas[currentArea]?.isOldInjury || false),
										)
									}
								/>
							</View>
							<View style={styles.checkBoxRow}>
								<CheckBox
									title="Rehabilitering?"
									checked={
										selectedAreas[currentArea]?.isRehabilitation || false
									}
									onPress={() =>
										handleFocusChange(
											"isRehabilitation",
											!(selectedAreas[currentArea]?.isRehabilitation || false),
										)
									}
								/>
								<CheckBox
									title="Annet"
									checked={selectedAreas[currentArea]?.isOther || false}
									onPress={() =>
										handleFocusChange(
											"isOther",
											!(selectedAreas[currentArea]?.isOther || false),
										)
									}
								/>
							</View>
						</View>
					</>
				)}
			</CustomModal>
		</KeyboardAvoidingView>
	);
};

// |-------------|
// | Styles |
// |-------------|
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	toggleBodyContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
	bodySideText: {
		marginHorizontal: 10,
		fontSize: 16,
	},
	checkBoxContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
	checkBoxRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	continueButton: {
		alignSelf: "center",
		marginTop: 20,
	},
	infoContainer: {
		padding: 20,
		alignItems: "center",
	},
	infoText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 10,
	},
});

export default FocusAreaRegister;
