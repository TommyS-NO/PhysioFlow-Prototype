import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../ExerciseOverviewScreen_Style";

const localGif = require("../../../Assets/12501301.gif");

const formatDate = (isoString: string | undefined): string => {
	if (!isoString) {
		return "Invalid date";
	}
	const date = new Date(isoString);
	return Number.isNaN(date.getTime())
		? "Invalid date"
		: new Intl.DateTimeFormat("nb-NO", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
		  }).format(date);
};

const ExerciseItem = ({ exercise, onEdit, onComplete, onRemove, isActive }) => {
	const isCompleted = exercise.status === "completed";
	const imageUri = exercise.image
		? { uri: exercise.image.replace("localhost", "192.xxx.xx.xxx") } //INSERT IP HERE!
		: localGif;

	return (
		<View style={[styles.sessionItem, isActive ? styles.activeItem : null]}>
			<View style={styles.sessionImageOverlay}>
				<Image source={imageUri} style={styles.sessionImage} />
				{isCompleted && (
					<View style={styles.completedOverlay}>
						<Text style={styles.completedText}>
							Gjennomført {formatDate(exercise.completedAt)}
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
