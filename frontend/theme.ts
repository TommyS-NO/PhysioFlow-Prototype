interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    primaryButton: string;
    button: string;
	buttonText: string;
	helpButton: string;
	infoText: string;
    icon: string;
    disabled: string;
    disabledText: string;
  };
  fontSize: {
    regular: number;
    title: number;
    h1: number;
    h2: number;
    h3: number;
    h4: number;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
}

export const theme: Theme = {
	colors: {
		primary: "rgba(38, 128, 124, 0.2)",
		primaryButton: "#26807C",
		buttonText: "#ffffff",
		infoText: "#000000",
		button: "#26807C",
		helpButton: "#1D576C",
		icon: "#FFF",
		secondary: "#000000",
		disabled: "#cccccc",
		disabledText: "#666666",
		text: "#000000",
	},
	fontSize: {
		regular: 16,
		title: 20,
		h1: 32,
		h2: 24,
		h3: 18,
		h4: 16,
	},
	spacing: {
		small: 8,
		medium: 16,
		large: 24,
	},
	borderRadius: {
		small: 4,
		medium: 8,
		large: 12,
	},
};
