import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Image,
	TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "./ExerciseScreen_Style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useExercises } from "../../Context/ExerciseContext";
import { apiService } from "../../Services/ApiService";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";

interface ExerciseSession {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
}

interface RouteParams {
	recommendedExercises?: string[];
}

const ExerciseScreen = () => {
	const [exercises, setExercises] = useState<ExerciseSession[]>([]);
	const [filteredExercises, setFilteredExercises] = useState<ExerciseSession[]>(
		[],
	);
	const [searchQuery, setSearchQuery] = useState("");
	const { addExercise } = useExercises();
	const [addedExercises, setAddedExercises] = useState<Record<string, boolean>>(
		{},
	);
	const route = useRoute();
	const routeParams = route.params as RouteParams;
	const [showFeedback, setShowFeedback] = useState(false);

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				const exercisesResponse = await apiService.getAllExercises();
				const exercisesArray: ExerciseSession[] = Object.entries(
					exercisesResponse,
				).map(([id, details]) => ({
					id,
					title: id.replace(/_/g, " "),
					...details,
				}));
				if (routeParams?.recommendedExercises) {
					const recommended = exercisesArray.filter((exercise) =>
						routeParams.recommendedExercises?.includes(exercise.id),
					);
					const others = exercisesArray.filter(
						(exercise) =>
							!routeParams.recommendedExercises?.includes(exercise.id),
					);
					setExercises([...recommended, ...others]);
				} else {
					setExercises(exercisesArray);
				}
				setFilteredExercises(exercisesArray);
			} catch (error) {
				console.error("Error fetching all exercises:", error);
			}
		};
		fetchExercises();
	}, [routeParams?.recommendedExercises]);

	useEffect(() => {
		const filtered = exercises.filter((exercise) =>
			exercise.title.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		setFilteredExercises(filtered);
	}, [searchQuery, exercises]);

	const handleAddExercise = (exercise: ExerciseSession) => {
		addExercise({
			id: exercise.id,
			name: exercise.title,
			description: exercise.description,
			image: exercise.image,
			category: exercise.category,
		});
		setAddedExercises((prev) => ({ ...prev, [exercise.id]: true }));
		setShowFeedback(true);
		setTimeout(() => setShowFeedback(false), 1000);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View style={styles.searchBar}>
				<TextInput
					placeholder="Søk etter øvelser..."
					style={styles.searchInput}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>
			<FlatList
				data={filteredExercises}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.sessionItem}>
						<Image
							source={require("../../Assets/12501301.gif")}
							style={styles.sessionImage}
							accessibilityLabel="A person that works out"
						/>
						<View style={styles.sessionInfo}>
							<Text style={styles.sessionTitle}>{item.title}</Text>
							<Text style={styles.sessionDescription}>{item.description}</Text>
							{routeParams?.recommendedExercises?.includes(item.id) && (
								<View style={styles.recommendedContainer}>
									<MaterialIcons name="star" size={24} color="green" />
									<Text style={styles.recommendedLabel}>Anbefalt</Text>
								</View>
							)}
						</View>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => handleAddExercise(item)}
						>
							<MaterialIcons
								name={addedExercises[item.id] ? "check" : "add"}
								size={24}
								color={addedExercises[item.id] ? "green" : "black"}
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
			{showFeedback && (
				<Text style={styles.feedbackText}>
					Øvelsen er lagt til i treningsplanen din!
				</Text>
			)}
			<FooterNavigation />
		</KeyboardAvoidingView>
	);
};

export default ExerciseScreen;
