import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	Alert,
	ImageSourcePropType,
} from "react-native";
import { format, parseISO } from "date-fns";
import CustomButton from "../Components/CustomButton/CustomButton";
import CustomModal from "../Components/CustomModal/CustomModal";
import CustomSlider from "../Components/CustomSlider/CustomSlider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ExerciseOverviewScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"ExerciseSession"
>;

interface ExerciseOverviewScreenProps {
	navigation: ExerciseOverviewScreenNavigationProp;
}

interface ExerciseSession {
	id: string;
	title: string;
	description: string;
	image: ImageSourcePropType;
	datetime: string;
	reps?: number;
	painThreshold?: number;
	timeSpent?: number;
}

const { width } = Dimensions.get("window");

const EXERCISE_SESSIONS: ExerciseSession[] = [
	{
		id: "1",
		title: "Bein og Gluteus Maximus Styrke",
		description:
			"Dette programmet fokuserer på nedre del av kroppen, spesielt bein og rumpe. Perfekt for å bygge styrke og utholdenhet.",
		image: require("../Assets/Gif/12501301.gif"),
		datetime: "2024-01-01T08:00:00Z",
	},
	{
		id: "2",
		title: "Kjerne og Abs Kondisjonering",
		description:
			"Intensiv kjerne- og magetrening for å forbedre stabilitet og bygge muskeldefinisjon.",
		image: require("../Assets/Gif/12501301.gif"),
		datetime: "2024-01-01T08:00:00Z",
	},
	{
		id: "3",
		title: "Fullkropps HIIT",
		description:
			"Høy intensitets intervalltrening som dekker hele kroppen. Forbrenn kalorier og bygg muskler effektivt.",
		image: require("../Assets/Gif/12501301.gif"),
		datetime: "2024-01-01T08:00:00Z",
	},
];

const ExerciseOverviewScreen: React.FC<ExerciseOverviewScreenProps> = ({
	navigation,
}) => {
	const [sessions, setSessions] =
		useState<ExerciseSession[]>(EXERCISE_SESSIONS);
	const [selectedSession, setSelectedSession] =
		useState<ExerciseSession | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const openModal = (session: ExerciseSession) => {
		setSelectedSession(session);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const updateSessionDetails = (
		id: string,
		newDetails: Partial<ExerciseSession>,
	) => {
		setSessions(
			sessions.map((session) =>
				session.id === id ? { ...session, ...newDetails } : session,
			),
		);
		if (selectedSession?.id === id) {
			setSelectedSession({ ...selectedSession, ...newDetails });
		}
	};

	const deleteExerciseSession = (id: string) => {
		Alert.alert("Slett", "Er du sikker på at du vil slette denne økten?", [
			{ text: "Avbryt", style: "cancel" },
			{
				text: "Slett",
				onPress: () => {
					setSessions(sessions.filter((session) => session.id !== id));
					closeModal();
				},
				style: "destructive",
			},
		]);
	};
	const renderItem = ({ item }: { item: ExerciseSession }) => (
		<View style={styles.sessionItem}>
			<Text style={styles.sessionTitle}>{item.title}</Text>
			<TouchableOpacity
				onPress={() => openModal(item)}
				style={styles.iconButton}
			>
				<MaterialCommunityIcons name="eye" size={24} color="#FFF" />
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={sessions}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
			/>
			{selectedSession && (
				<CustomModal
					visible={isModalVisible}
					onClose={closeModal}
					title={selectedSession?.title ?? "Øvelsesdetaljer"}
				>
					<Text style={styles.modalDescription}>
						{selectedSession.description}
					</Text>
					<Image source={selectedSession.image} style={styles.modalImage} />
					{/* Slider og andre inputfelt for å oppdatere øvelsesdetaljer */}
				</CustomModal>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0a0a0a",
	},
	sessionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#1c1c1e",
		marginHorizontal: 10,
	},
	sessionTitle: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		flex: 1,
	},
	sessionDateTime: {
		color: "#fff",
		fontSize: 14,
	},
	modalDescription: {
		color: "#fff",
		marginBottom: 10,
	},
	modalImage: {
		width: width - 40,
		height: 200,
		resizeMode: "contain",
		marginBottom: 20,
	},
});
export default ExerciseOverviewScreen;