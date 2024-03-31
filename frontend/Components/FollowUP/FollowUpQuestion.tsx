import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import CustomSelector from "../CustomSelector/CustomSelector";
import CustomSlider from "../CustomSlider/CustomSlider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusArea } from "../../Context/FocusContext";

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

const FollowUpQuestion = () => {
	const { state } = useFocusArea(); // Hent svar fra FocusContext
	const [followUpAnswers, setFollowUpAnswers] = useState({});

	useEffect(() => {
		// Initialiser oppfølgingssvar basert på svar fra FocusSelection
		const initFollowUpAnswers = Object.keys(state.answers).reduce(
			(acc, key) => {
				acc[key] = {
					activityWhenPainStarted: "",
					previousInjuryTreatment: "",
					lifestyleChangesContributingToPain: "",
					painTriggerActivities: "",
					dailyActivitiesAffectingPain: "",
					painComparisonToPreviousEpisodes: 5, // Anta en skala fra 1-10 for slideren
					unspecifiedPainTrigger: "",
					painDuration: 0,
					painIntensityChange: 5,
				};
				return acc;
			},
			{},
		);

		setFollowUpAnswers(initFollowUpAnswers);
	}, [state.answers]);

	const handleChange = (key, field, value) => {
		setFollowUpAnswers((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				[field]: value,
			},
		}));
	};

	const handleSubmit = () => {
		// Behandle og send inn oppfølgingssvarene her
		Alert.alert("Oppfølging Fullført", "Dine detaljerte svar er sendt inn.");
	};

	return (
		<ScrollView>
			{Object.keys(followUpAnswers).map((key) => (
				<View key={key}>
					<Text>{`Oppfølgingsspørsmål for ${key}`}</Text>
					{/* Dynamisk generer spørsmål basert på svar */}
					{/* Eksempel: */}
					<TextInput
						value={followUpAnswers[key].activityWhenPainStarted}
						onChangeText={(text) =>
							handleChange(key, "activityWhenPainStarted", text)
						}
						placeholder="Hvilke aktiviteter utførte du da smerten først oppstod?"
					/>
					{/* Flere TextInput og CustomSlider som nødvendig */}
					<CustomSlider
						value={followUpAnswers[key].painComparisonToPreviousEpisodes}
						onValueChange={(value) =>
							handleChange(key, "painComparisonToPreviousEpisodes", value)
						}
						minimumValue={1}
						maximumValue={10}
						step={1}
					/>
					{/* Implementer resten av oppfølgingsspørsmålene med tilsvarende logikk */}
				</View>
			))}
			<CustomButton title="Send Inn Svar" onPress={handleSubmit} />
		</ScrollView>
	);
};

export default FollowUpQuestion;
