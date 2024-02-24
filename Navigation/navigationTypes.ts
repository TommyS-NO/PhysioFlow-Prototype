export type RootStackParamList = {
	Front: undefined;
	Register: { termsAccepted?: boolean };
	TermsScreen: undefined;
	TBA: undefined;
	UserGuideScreen: undefined;
	InfoScreen: { title: string; message: string; onContinue?: () => void };
};
