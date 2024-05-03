export type RootStackParamList = {
  Front: undefined;
  Register: { termsAccepted?: boolean };
  TermsScreen: undefined;
  FocusScreen: undefined;
  ExerciseOverviewScreen: undefined;
  UserGuideScreen: undefined;
  AboutScreen: undefined;
  ExerciseScreen: { recommendedExercises?: string[] };
  ProfileScreen: {userName?: string};
  SettingsScreen: undefined;
  ContactScreen: undefined;
  RegisterWorkout: undefined;
  CompletedWorkoutsScreen: undefined;
  ChatScreen: undefined;
  DiagnoseScreen: undefined;
  ProgressScreen: {
    exerciseId: string;
    userId: string;
  };
};
