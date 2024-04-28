export type RootStackParamList = {
  Front: undefined;
  Register: { termsAccepted?: boolean };
  TermsScreen: undefined;
  FocusScreen: undefined;
  ExerciseOverviewScreen: undefined;
  UserGuideScreen: undefined;
  DeleteUserScreen: undefined;
  NewScreen: undefined;
  AboutScreen: undefined;
  ExerciseScreen: { recommendedExercises?: string[] };
  ProfileScreen: {userName?: string};
  SettingsScreen: undefined;
  ContactScreen: undefined;
  RegisterWorkout: undefined;
  HealthScreen: undefined;
  CompletedWorkoutsScreen: undefined;
  ChatScreen: undefined;
};
