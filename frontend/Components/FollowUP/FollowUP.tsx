import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import CustomSelector from "../CustomSelector/CustomSelector";
import CustomSlider from "../CustomSlider/CustomSlider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

interface FocusAreaResponse {
	painDescription: string;
	painIntensity: number;
	symptomDuration: number;
	additionalComments: string;
	painType: string;
	painTrigger?: string;
	injuryCause?: string[];
}

interface FollowUpQuestionProps {
	selectedAreas: { [key in FocusAreaKey]?: InjuryState };
	onContinue: (
		responses: { [key in FocusAreaKey]?: FocusAreaResponse },
	) => void;
}

const FollowUpQuestion: React.FC<FollowUpQuestionProps> = ({
	selectedAreas,
	onContinue,
}) => {
	const [responses, setResponses] = useState<{
		[key in FocusAreaKey]?: FocusAreaResponse;
	}>({});
	const [expandedArea, setExpandedArea] = useState<FocusAreaKey | null>(null);

	useEffect(() => {
		setResponses(
			Object.keys(selectedAreas).reduce(
				(acc, key) => ({
					...acc,
					[key]: {
						painDescription: "",
						painIntensity: 5,
						symptomDuration: 0,
						additionalComments: "",
						painType: "",
						painTrigger: "",
						injuryCause: [],
					},
				}),
				{} as { [key in FocusAreaKey]?: FocusAreaResponse },
			),
		);
	}, [selectedAreas]);

	const isFormValid = (): boolean => {
		return Object.values(responses).every((response) => {
			if (typeof response === "object") {
				return (
					response.painDescription !== "" &&
					response.painIntensity > 0 &&
					response.painType !== "" &&
					response.painTrigger !== ""
				);
			}
			return false;
		});
	};

	const handleAreaToggle = (area: FocusAreaKey) => {
		setExpandedArea(expandedArea === area ? null : area);
	};

	const handleInputChange = (
		area: FocusAreaKey,
		field: keyof FocusAreaResponse,
		value: string | number,
	) => {
		setResponses((prev) => {
			const prevResponse = prev[area] || {};
			if (typeof prevResponse === "object") {
				return {
					...prev,
					[area]: { ...prevResponse, [field]: value },
				};
			}
			return prev;
		});
	};

	const renderSection = (area: FocusAreaKey) => {
		const isOpen = expandedArea === area;
		const response = responses[area] || {};

		return (
			<View key={area} style={styles.section}>
				<TouchableOpacity
					style={styles.header}
					onPress={() => handleAreaToggle(area)}
				>
					<Text style={styles.headerText}>{area}</Text>
					<Icon name={isOpen ? "chevron-up" : "chevron-down"} size={24} />
				</TouchableOpacity>
				{isOpen && (
					<View style={styles.content}>
						<CustomSelector
							label="Smerte type"
							options={["Stikkende", "Bankende", "Verkende", "Skjærende"]}
							selectedOption={response.painType}
							onSelect={(selected) =>
								handleInputChange(area, "painType", selected)
							}
						/>
						<CustomSelector
							label="Smerte Trigger?"
							options={["1", "2", "3", "annet"]}
							selectedOption={response.painTrigger || ""}
							onSelect={(selected) =>
								handleInputChange(area, "painTrigger", selected)
							}
						/>

						<CustomSlider
							title={`Smerteintensitet (1-10): ${response.painIntensity}`}
							value={response.painIntensity}
							onValueChange={(value) =>
								handleInputChange(area, "painIntensity", value)
							}
						/>
						<CustomSlider
							title={`Varighet av symptomer (uker): ${response.symptomDuration}`}
							value={response.symptomDuration}
							onValueChange={(value) =>
								handleInputChange(area, "symptomDuration", value)
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Andre kommentarer"
							value={response.additionalComments}
							onChangeText={(text) =>
								handleInputChange(area, "additionalComments", text)
							}
						/>
					</View>
				)}
			</View>
		);
	};

	return (
		<ScrollView style={styles.container}>
			{Object.keys(selectedAreas).map((area) =>
				renderSection(area as FocusAreaKey),
			)}
			<CustomButton
				title="Fortsett"
				onPress={() => onContinue(responses)}
				disabled={!isFormValid()}
			/>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	section: {
		marginBottom: 20,
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	content: {
		paddingVertical: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#cccccc",
		borderRadius: 4,
		padding: 12,
		marginBottom: 16,
		fontSize: 16,
	},
	deleteButtonContainer: {
		marginTop: 16,
		marginBottom: 32,
	},
	deleteButtonText: {
		color: "#FF0000",
	},
	disabledContinueButton: {
		backgroundColor: "#cccccc",
	},
});

export default FollowUpQuestion;
