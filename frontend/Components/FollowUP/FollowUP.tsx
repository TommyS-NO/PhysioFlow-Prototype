import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import CustomSlider from "../CustomSlider/CustomSlider";

// Typen for et enkelt fokusområde og tilhørende tilstander
type FocusAreaKey = "Skulder" | "Kne" | "Ankel/Fot"; // Utvid etter behov...

interface InjuryState {
	isNewInjury: boolean;
	isOldInjury: boolean;
	isRehabilitation: boolean;
	isOther: boolean;
}

// Props for FollowUpQuestion-komponenten, som inneholder valgte fokusområder og en fortsett-funksjon
interface FollowUpQuestionProps {
	selectedAreas: { [key in FocusAreaKey]?: InjuryState };
	onContinue: (responses: { [key in FocusAreaKey]?: any }) => void;
}

// En hjelpekomponent for individuelle spørsmål
const Question = ({
	label,
	value,
	onValueChange,
}: {
	label: string;
	value: number;
	onValueChange: (value: number) => void;
}) => (
	<View style={styles.questionContainer}>
		<Text style={styles.question}>{label}</Text>
		<CustomSlider
			title={label}
			value={value}
			onValueChange={onValueChange}
			minimumValue={0}
			maximumValue={10}
			step={1}
		/>
	</View>
);

const FollowUpQuestion: React.FC<FollowUpQuestionProps> = ({
	selectedAreas,
	onContinue,
}) => {
	const [responses, setResponses] = useState<{ [key: string]: any }>({});

	// Initialiser responsene for de valgte fokusområdene
	useEffect(() => {
		const initialResponses = Object.keys(selectedAreas).reduce((acc, area) => {
			acc[area] = {
				painNature: "",
				painIntensity: 0,
				symptomDuration: 0,
				additionalNotes: "",
			};
			return acc;
		}, {});
		setResponses(initialResponses);
		// Vis en instruksjonsmelding til brukeren
		Alert.alert(
			"Instruksjoner",
			"Vennligst fyll ut oppfølgningsspørsmålene for hvert valgte fokusområde.",
		);
	}, [selectedAreas]);

	// Håndter endringer i inputfeltene for hvert fokusområde
	const handleInputChange = (
		areaKey: FocusAreaKey,
		key: string,
		value: any,
	) => {
		setResponses((prev) => ({
			...prev,
			[areaKey]: {
				...(prev[areaKey] || {}),
				[key]: value,
			},
		}));
	};

	// Når brukeren er klar til å fortsette, send inn svarene
	const handleContinue = () => {
		onContinue(responses);
	};

	return (
		<ScrollView style={styles.container}>
			{Object.keys(selectedAreas).map((areaKey) => (
				<View key={areaKey} style={styles.areaSection}>
					<Text style={styles.header}>{areaKey}</Text>
					<TextInput
						style={styles.input}
						placeholder="Beskriv smerten (stikkende, brennende, etc.)"
						onChangeText={(text) =>
							handleInputChange(areaKey as FocusAreaKey, "painNature", text)
						}
					/>
					<Question
						label="Smerteintensitet (1-10)"
						value={responses[areaKey]?.painIntensity || 0}
						onValueChange={(value) =>
							handleInputChange(areaKey as FocusAreaKey, "painIntensity", value)
						}
					/>
					<Question
						label="Varighet av symptomer (uker)"
						value={responses[areaKey]?.symptomDuration || 0}
						onValueChange={(value) =>
							handleInputChange(
								areaKey as FocusAreaKey,
								"symptomDuration",
								value,
							)
						}
					/>
					<TextInput
						style={styles.input}
						placeholder="Andre kommentarer"
						onChangeText={(text) =>
							handleInputChange(
								areaKey as FocusAreaKey,
								"additionalNotes",
								text,
							)
						}
					/>
				</View>
			))}
			<CustomButton title="Fortsett" onPress={handleContinue} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	areaSection: {
		marginBottom: 20,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	questionContainer: {
		marginBottom: 20,
	},
	question: {
		fontSize: 16,
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
		borderRadius: 5,
		marginBottom: 15,
	},
	// Legg til flere stiler etter behov
});

export default FollowUpQuestion;
