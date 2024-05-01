import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { apiService } from "../../Services/ApiService";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import { RouteProp } from "@react-navigation/native";

type Props = {
	route: RouteProp<RootStackParamList, "ProgressScreen">;
};

type FollowupAnswers = {
	painIntensity: number;
	repetitionsCompleted: number;
	difficultyLevel: number;
	timeTaken: number;
	generalAbility: number;
};

const ProgressScreen: React.FC<Props> = ({ route }) => {
	const { exerciseId, userId } = route.params;
	const [answers, setAnswers] = useState<FollowupAnswers[]>([]);
	const [loading, setLoading] = useState(true);

	console.log("Route params:", route.params); // Logge innkommende parametere

	useEffect(() => {
		if (!exerciseId || !userId) {
			console.error("ExerciseId or UserId is undefined");
			return;
		}
		const fetchProgressData = async () => {
			try {
				setLoading(true);
				const fetchedAnswers = await apiService.getProgressData(
					userId,
					exerciseId,
				);
				setAnswers(fetchedAnswers);
				console.log("Fetched answers:", fetchedAnswers); // Logg hentede svar
			} catch (error) {
				console.error("Failed to fetch progress data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProgressData();
	}, [exerciseId, userId]);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				data: answers.map((answer) => answer.painIntensity),
				strokeWidth: 2,
			},
		],
	};

	const chartConfig = {
		backgroundColor: "#e26a00",
		backgroundGradientFrom: "#fb8c00",
		backgroundGradientTo: "#ffa726",
		decimalPlaces: 2,
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: "6",
			strokeWidth: "2",
			stroke: "#ffa726",
		},
	};

	return (
		<View>
			<Text>Progresjon for Øvelse {exerciseId}</Text>
			<LineChart
				data={data}
				width={Dimensions.get("window").width}
				height={220}
				chartConfig={chartConfig}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
		</View>
	);
};

export default ProgressScreen;
