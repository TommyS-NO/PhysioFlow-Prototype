// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from "react";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../Components/CustomButton/CustomButton";
import CustomModal from "../Components/CustomModal/CustomModal";
import { CheckBox } from "react-native-elements";
import BodyChart from "../Components/BodyChart/bodyChart";
import FollowUpQuestion from "../Components/Follow-Up/followUpQuestionProps";
import { useNavigation } from "@react-navigation/native";
// biome-ignore lint/style/useImportType: <explanation>
import { RootStackParamList } from "../Navigation/navigationTypes";
// biome-ignore lint/style/useImportType: <explanation>
import { StackNavigationProp } from "@react-navigation/stack";

type FocusAreaScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"FocusAreaScreen"
>;

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
	sliderValue: number;
}

const FocusAreaRegister: React.FC = () => {
	const navigation = useNavigation<FocusAreaScreenNavigationProp>();
	const [bodySide, setBodySide] = useState<"front" | "back">("front");
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [selectedAreas, setSelectedAreas] = useState<{
		[key in FocusAreaKey]?: InjuryState;
	}>({});
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [currentArea, setCurrentArea] = useState<FocusAreaKey | null>(null);
	const [skipForNow, setSkipForNow] = useState<boolean>(false);

	// |-------------|
	// | Handle Area |
	// |-------------|
	const handleAreaPress = (area: FocusAreaKey): void => {
		setCurrentArea(area);
		setIsModalVisible(true);
		if (!selectedAreas[area]) {
			setSelectedAreas((prevAreas) => ({
				...prevAreas,
				[area]: { isNewInjury: false, isOldInjury: false, sliderValue: 0 },
			}));
		}
	};

	const handleInjuryChange = (
		type: keyof InjuryState,
		value: boolean | number,
	): void => {
		if (currentArea) {
			setSelectedAreas((prevState) => ({
				...prevState,
				[currentArea]: {
					...prevState[currentArea],
					[type]: value,
				},
			}));
		}
	};

	// |-------------|
	// | Close Modal |
	// |-------------|
	const closeModal = (): void => {
		setIsModalVisible(false);
	};

	// |-------------|
	// |  Next Step |
	// |-------------|

	const handleNextStep = (): void => {
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		} else {
			console.log("Complete data:", selectedAreas);
			Alert.alert("Fullført", "Dine valg er registrert.");
		}
	};

	const toggleBodySide = () => {
		setBodySide((prevBodySide) =>
			prevBodySide === "front" ? "back" : "front",
		);
	};
	const isAnyCheckboxChecked = () => {
		if (currentArea) {
			const area = selectedAreas[currentArea];
			return area?.isNewInjury || area?.isOldInjury;
		}
		return false;
	};

	// |-------------|
	// | Render  |
	// |-------------|

	const renderStepContent = (): JSX.Element | null => {
		switch (currentStep) {
			case 1:
				return <BodyChart bodySide={bodySide} onAreaPress={handleAreaPress} />;
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
	const handleProceed = () => {
		const anyInjuriesSelected = Object.values(selectedAreas).some((area) => {
			return area.isNewInjury || area.isOldInjury;
		});

		if (anyInjuriesSelected) {
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
				<View style={styles.toggleBodyContainer}>
					<MaterialCommunityIcons
						name="chevron-left"
						size={30}
						color="#000"
						onPress={toggleBodySide}
					/>
					<Text style={styles.bodySideText}>
						{bodySide === "front" ? "Forsiden" : "Baksiden"}
					</Text>
					<MaterialCommunityIcons
						name="chevron-right"
						size={30}
						color="#000"
						onPress={toggleBodySide}
					/>
				</View>
				{renderStepContent()}
				{currentStep === 1 && (
					<CustomButton
						title="Neste"
						onPress={handleProceed}
						disabled={!isAnyCheckboxChecked()}
					/>
				)}
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
										handleInjuryChange(
											"isNewInjury",
											!(selectedAreas[currentArea]?.isNewInjury || false),
										)
									}
								/>
								<CheckBox
									title="Gammel skade"
									checked={selectedAreas[currentArea]?.isOldInjury || false}
									onPress={() =>
										handleInjuryChange(
											"isOldInjury",
											!(selectedAreas[currentArea]?.isOldInjury || false),
										)
									}
								/>
							</View>
							<View style={styles.checkBoxRow}>
								<CheckBox
									title="Rehabilitering?"
									checked={false}
									onPress={() => {}}
								/>
								<CheckBox title="Annet" checked={false} onPress={() => {}} />
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
