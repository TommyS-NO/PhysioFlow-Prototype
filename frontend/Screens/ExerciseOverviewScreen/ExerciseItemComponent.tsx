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

const ExerciseItem = ({
	exercise,
	onEdit,
	onComplete,
	onRemove,
	isActive,
}: ExerciseItemProps) => {
	const isCompleted = exercise.status === "completed";

	const imageUri = exercise.image.replace("localhost", "192.168.10.182");

	return (
		<View style={[styles.sessionItem, isActive ? styles.activeItem : null]}>
			<View style={styles.sessionImageOverlay}>
				<Image
					source={{ uri: imageUri }}
					style={styles.sessionImage}
					onError={(e) => {
						e.currentTarget.src = require("../../Assets/12501301.gif");
					}}
				/>
				{isCompleted && (
					<View style={styles.completedOverlay}>
						<Text style={styles.completedText}>
							Gjennomført{" "}
							{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
							{formatDate(exercise.completedAt!)}
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
							<MaterialIcons name="check-circle" size={24} color="#26807C" />
							<Text style={styles.completeText}>Gjennomfør</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity style={styles.removeButton} onPress={onRemove}>
						<MaterialIcons name="remove-circle" size={24} color="#D32F2F" />
						<Text style={styles.removeText}>Slett</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ExerciseItem;
