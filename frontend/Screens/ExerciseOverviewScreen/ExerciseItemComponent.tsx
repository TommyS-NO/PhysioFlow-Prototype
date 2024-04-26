import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Exercise } from "../../Context/ExerciseContext";
import { styles } from "./ExerciseOverviewScreen_Style";

interface ExerciseItemProps {
	exercise: Exercise;
	onEdit: () => void;
	onComplete: () => void;
	onRemove: () => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
	exercise,
	onEdit,
	onComplete,
	onRemove,
}) => {
	const isCompleted = exercise.status === "completed";

	return (
		<View style={styles.sessionItem}>
			<View style={styles.sessionImageOverlay}>
				<Image
					source={{
						uri: exercise.image.replace("localhost", "192.168.10.182"),
					}}
					style={styles.sessionImage}
				/>
				{isCompleted && (
					<View style={styles.completedOverlay}>
						<Text style={styles.completedText}>
							Gjennomført {exercise.completedAt}
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
