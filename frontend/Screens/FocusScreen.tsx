import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Text,
} from "react-native";
import CustomButton from "../Components/CustomButton/CustomButton";
import BodyChart from "../Components/BodyChart/bodyChart";
import FollowUpQuestion from "../Components/FollowUP/FollowUP";
import FocusSelection from "../Components/FocusSelection/FocusSelection";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigationTypes";

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

interface FocusAreaState {
	[key in FocusAreaKey]?: string;
}

// Typedefinisjoner for navigasjon og rute, antar at 'RootStackParamList' er definert
type FocusScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"FocusScreen"
>;
type FocusScreenRouteProp = RouteProp<RootStackParamList, "FocusScreen">;

// Props for komponenten, inkludert navigation og route props
interface FocusScreenProps {
	navigation: FocusScreenNavigationProp;
	route: FocusScreenRouteProp;
}

const FocusScreen: React.FC<FocusScreenProps> = ({ navigation, route }) => {
	const [bodySide, setBodySide] = useState<"front" | "back">("front");
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [selectedFocusAreas, setSelectedFocusAreas] = useState<FocusAreaState>(
		{},
	);
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
		setCurrentArea(area); // Lagrer gjeldende område før vi åpner modalen
	};

	const handleFocusSelectionUpdate = (area: FocusAreaKey, value: string) => {
		setSelectedFocusAreas((prevState) => ({ ...prevState, [area]: value }));
	};

	const handleNextStep = (): void => {
		const selectedCount = Object.keys(selectedFocusAreas).length;
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
		setBodySide((prevSide) => (prevSide === "front" ? "back" : "front"));
	};

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
							onPress={handleNextStep}
							disabled={Object.keys(selectedFocusAreas).length === 0}
						/>
					</>
				);
			case 2:
				return (
					<FollowUpQuestion
						selectedAreas={selectedFocusAreas}
						onContinue={() => setCurrentStep((prevStep) => prevStep + 1)}
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

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.content}>
				{renderStepContent()}
			</ScrollView>
			{currentArea && (
				<FocusSelection
					visible={currentArea !== null}
					onClose={() => setCurrentArea(null)}
					onUpdate={(value: string) =>
						currentArea && handleFocusSelectionUpdate(currentArea, value)
					}
					area={currentArea || "Hode/Nakke"} // En fallback-verdi
					initialSelection={
						selectedFocusAreas[currentArea || "Hode/Nakke"] || ""
					}
				/>
			)}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
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

export default FocusScreen;
