interface Theme {
	colors: {
		primary: string;
		secondary: string;
		text: string;
		button: string;
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
		primary: "#26807C",
		text: "#000000",
		button: "#26807C",
		icon: "#FFF",
		secondary: "#000000",
		disabled: "#cccccc",
		disabledText: "#666666",
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
