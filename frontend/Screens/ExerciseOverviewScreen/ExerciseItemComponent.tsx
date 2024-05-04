import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ImageErrorEventData,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Exercise } from "../../Context/ExerciseContext";
import { styles } from "./ExerciseOverviewScreen_Style";

interface ExerciseItemProps {
	exercise: Exercise;
	onEdit: () => void;
	onComplete: () => void;
	onRemove: () => void;
	isActive: boolean;
}

const formatDate = (isoString: string): string => {
	const date = new Date(isoString);
	return new Intl.DateTimeFormat("nb-NO", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({
	exercise,
	onEdit,
	onComplete,
	onRemove,
	isActive,
}) => {
	const isCompleted = exercise.status === "completed";
	const formattedDate = exercise.completedAt
		? formatDate(exercise.completedAt)
		: "";
	const imageUri = exercise.image.replace("localhost", "192.168.10.182");

	const onErrorLoadingImage = (e: ImageErrorEventData) => {
		console.error(`Error loading image:`);
	};

	return (
		<View style={[styles.sessionItem, isActive ? styles.activeItem : null]}>
			<View style={styles.sessionImageOverlay}>
				<Image
					source={{ uri: imageUri }}
					style={styles.sessionImage}
					onError={onErrorLoadingImage}
				/>
				{isCompleted && (
					<View style={styles.completedOverlay}>
						<Text style={styles.completedText}>
							Gjennomført {formattedDate}
						</Text>
					</View>
				)}
			</View>
			<View style={styles.sessionInfo}>
				<Text style={styles.sessionTitle}>{exercise.name}</Text>
				<Text style={styles.sessionDescription}>{exercise.description}</Text>
				<View style={styles.actionsContainer}>
					{!isCompleted && (
						<TouchableOpacity
							style={styles.completeButton}
							onPress={onComplete}
						>
							<MaterialIcons name="check-circle" size={24} color="green" />
							<Text style={styles.completeText}>Gjennomfør</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity style={styles.removeButton} onPress={onRemove}>
						<MaterialIcons name="remove-circle" size={24} color="red" />
						<Text style={styles.removeText}>Slett</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ExerciseItem;
