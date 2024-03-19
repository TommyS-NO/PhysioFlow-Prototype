export type RootStackParamList = {
  Front: undefined;
  Register: { termsAccepted?: boolean };
  TermsScreen: undefined;
  TBA: undefined;
  FocusScreen: undefined;
  ExerciseSession: undefined;
  UserGuideScreen: undefined;
  DeleteUserScreen: undefined;
  AboutScreen: undefined;
  SearchScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
  ContactScreen: undefined;

  InfoScreen: { title: string; message: string; onContinue?: () => void };
};
