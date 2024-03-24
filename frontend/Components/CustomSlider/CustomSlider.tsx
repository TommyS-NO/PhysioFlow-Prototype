import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

interface CustomSliderProps {
	value: number;
	onValueChange: (value: number) => void;
	title: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
	value,
	onValueChange,
	title,
}) => {
	const getColor = (value: number): string => {
		const ratio = value / 10;
		const red = Math.floor(255 * ratio);
		const green = Math.floor(255 * (1 - ratio));
		return `rgb(${red},${green},0)`;
	};

  // Lager en rad med tallene 1 til 10 under slideren. Ok at vi har det sånn? 
  const renderScale = () => {
    return (
      <View style={styles.scaleContainer}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <Text key={number} style={styles.scaleText}>{number}</Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.sliderBackground}>
        <Slider
          style={styles.slider}
          value={value}
          onValueChange={onValueChange}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={getColor(value)}
          maximumTrackTintColor="#000000"
          thumbTintColor={getColor(value)}
        />
      </View>
      {renderScale()}
    </View>
  );
};

const fullWidth = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
    marginVertical: 10,
  },
  sliderBackground: {
    height: 30,
    width: fullWidth,
    borderRadius: 15,
    backgroundColor: "#ddd",
    justifyContent: "center",
  },
  slider: {
    width: fullWidth,
    height: 40,
    position: "absolute",
  },
  title: {
    fontSize: 16,
    color: "black",
    marginBottom: 4,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  scaleText: {
    fontSize: 12,
  },
});

export default CustomSlider;