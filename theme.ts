interface Theme {
  colors: {
    primary: string;
    text: string;
    button: string;
    icon: string;
  };
  fontSize: {
    regular: number;
    title: number;
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
    primary: '#26807C',
    text: '#FFF',
    button: '#26807C',
    icon: '#FFF',
  },
  fontSize: {
    regular: 16,
    title: 20,
  },
  spacing: {
    small: 4,
    medium: 10,
    large: 15,
  },
  borderRadius: {
    small: 40,
    medium: 40,
    large: 40,
  },
};
