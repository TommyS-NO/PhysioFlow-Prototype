import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Image,
	TextInput,
} from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { surveyService } from "../../Services/SurveyService";
import { useRoute } from "@react-navigation/native";

type ExerciseDetails = {
	description: string;
	image: string;
};

type ExerciseSession = {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string; // Add a category to each exercise
};

type RouteParams = {
	recommendedExercises?: string[];
};

const SearchScreen = () => {
	const [exercises, setExercises] = useState<ExerciseSession[]>([]);
	const [filteredExercises, setFilteredExercises] = useState<ExerciseSession[]>(
		[],
	);
	const [selectedSession, setSelectedSession] =
		useState<ExerciseSession | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const route = useRoute();
	const routeParams = route.params as RouteParams;

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				const exercisesResponse = await surveyService.getAllExercises();
				const exercisesArray: ExerciseSession[] = Object.entries(
					exercisesResponse,
				).map(([id, details]) => ({
					id,
					title: id.replace(/_/g, " "),
					...details,
				}));

				// Move recommended exercises to the top if any
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

	const openModal = (session: ExerciseSession) => {
		setSelectedSession(session);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const handleAddToProgram = () => {
		if (selectedSession) {
			console.log("Adding exercise to program:", selectedSession.title);
		}
		closeModal();
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
					<TouchableOpacity
						style={[
							styles.sessionItem,
							routeParams?.recommendedExercises?.includes(item.id) &&
								styles.recommendedExercise,
						]}
						onPress={() => openModal(item)}
					>
						<Text style={styles.sessionTitle}>{item.title}</Text>
						<Image
							source={{
								uri: item.image.replace("localhost", "192.168.10.182"),
							}}
							style={styles.sessionImage}
						/>
					</TouchableOpacity>
				)}
				numColumns={2}
			/>
			{selectedSession && (
				<CustomModal
					visible={isModalVisible}
					onClose={closeModal}
					title={selectedSession.title}
					buttons={[
						{
							title: "Legg til i treningsprogram",
							onPress: handleAddToProgram,
						},
						{ title: "Lukk", onPress: closeModal },
					]}
				>
					<Image
						source={{ uri: selectedSession.image }}
						style={styles.modalImage}
					/>
					<Text style={styles.modalText}>{selectedSession.description}</Text>
				</CustomModal>
			)}
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingHorizontal: 10,
		backgroundColor: "#fff",
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: "center",
	},
	searchBar: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
	},
	sessionItem: {
		flex: 1,
		flexDirection: "column",
		margin: 5,
		alignItems: "center",
		maxWidth: "50%",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	sessionTitle: {
		flex: 1,
		fontSize: 18,
	},
	sessionImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	modalImage: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginBottom: 20,
	},
	modalText: {
		textAlign: "center",
		marginBottom: 20,
	},
	recommendedExercise: {
		borderColor: "green",
		borderWidth: 2,
	},
});
export default SearchScreen;
