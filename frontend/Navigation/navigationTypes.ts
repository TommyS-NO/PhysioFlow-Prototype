export type RootStackParamList = {
  Front: undefined;
  Register: { termsAccepted?: boolean };
  TermsScreen: undefined;
  TBA: undefined;
  FocusScreen: undefined;
  ExerciseSession: undefined;
  UserGuideScreen: undefined;
  MinaScreen: undefined;
  AboutScreen: undefined;
  InfoScreen: { title: string; message: string; onContinue?: () => void };
};
