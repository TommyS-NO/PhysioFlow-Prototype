type ExerciseDetails = {
	description: string;
	image: string;
};

type ExerciseSession = {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
};

type RouteParams = {
	recommendedExercises?: string[];
};
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

const ExerciseScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { exercises, addExercise, fetchExercises } = useExercises();
	const route = useRoute();
	const routeParams = route.params as RouteParams;

	useEffect(() => {
		fetchExercises();
	}, [fetchExercises]);

	const handleAddExercise = (exercise) => {
		addExercise(exercise);
	};
	const filteredExercises = exercises.filter((exercise) => {
		const searchMatch = exercise.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const isRecommended = routeParams?.recommendedExercises?.includes(
			exercise.id,
		);
		return routeParams?.recommendedExercises
			? searchMatch && isRecommended
			: searchMatch;
	});

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
							source={{
								uri: item.image.replace("localhost", "192.168.10.182"),
							}}
							style={styles.sessionImage}
						/>
						<View style={styles.sessionInfo}>
							<Text style={styles.sessionTitle}>{item.name}</Text>
							<Text style={styles.sessionDescription}>{item.description}</Text>
							{routeParams?.recommendedExercises?.includes(item.id) && (
								<View style={styles.recommendedContainer}>
									<MaterialIcons name="star" size={24} color="yellow" />
									<Text style={styles.recommendedLabel}>Anbefalt</Text>
								</View>
							)}
							<TouchableOpacity
								style={styles.addButton}
								onPress={() => handleAddExercise(item)}
							>
								<MaterialIcons name="add" size={24} color="black" />
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</KeyboardAvoidingView>
	);
};

export default ExerciseScreen;
