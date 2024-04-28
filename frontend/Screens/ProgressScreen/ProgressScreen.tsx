// ProgressScreen.tsx
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

type Props = {
	route: {
		params: {
			exerciseId: string;
			answers: {
				painIntensity: number[];
				repetitionsCompleted: number[];
				difficultyLevel: number[];
				timeTaken: number[];
				generalAbility: number[];
			};
		};
	};
};

const ProgressScreen: React.FC<Props> = ({ route }) => {
	const { exerciseId, answers } = route.params;

	// Eksempeldata
	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				data: answers.painIntensity, // Erstatt dette med faktiske smerteintensitetssvar
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
