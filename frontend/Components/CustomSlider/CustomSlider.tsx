import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  title: string;
  maximumValue: number;
  minimumValue: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onValueChange,
  title,
}) => {
  const getColor = (value: number): string => {
    const green = "#26807C";
    const red = "#D32F2F";

    const ratio = (value - 1) / 9;

    // Funksjon for å konvertere hex til RGB
    function hexToRgb(hex) {
      var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    }

    function interpolateColor(color1, color2, factor) {
      const result = color1.slice();
      for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
      }
      return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    }

    const rgbGreen = hexToRgb(green);
    const rgbRed = hexToRgb(red);

    return interpolateColor(rgbGreen, rgbRed, ratio);
  };

  const renderScale = () => {
    return (
      <View style={styles.scaleContainer}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <Text key={number} style={styles.scaleText}>
            {number}
          </Text>
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

const fullWidth = Dimensions.get("window").width - 55;

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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  scaleText: {
    fontSize: 12,
  },
});

export default CustomSlider;
