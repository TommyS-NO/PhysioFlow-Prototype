import React, { useContext } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { ExerciseContext } from "../../Context/ExerciseContext";
import { styles } from "./ExerciseOverviewScreen_Style";

const ExerciseOverviewScreen = () => {
	const { selectedExercises } = useContext(ExerciseContext);

	return (
		<View style={styles.container}>
			<FlatList
				data={selectedExercises}
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
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default ExerciseOverviewScreen;
