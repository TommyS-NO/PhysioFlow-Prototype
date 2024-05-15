export interface UserProfile {
  username?: string;
  email: string;
  gender?: "male" | "female" | "unspecified";
  height?: number;
  weight?: number;
  birthday?: string;
  profileImageUrl?: string;
}

export interface FollowupAnswers {
  painIntensity: number;
  repetitionsCompleted: number;
  difficultyLevel: number;
  timeTaken: number;
  generalAbility: number;
}

export interface CompletedExercise {
  exerciseId: string;
  answers: FollowupAnswers;
  completedAt: string;
}

export interface UserState {
  isLoggedIn: boolean;
  token: string | null;
  userDetails: UserProfile | null;
  userId: string | null;
  completedExercises: CompletedExercise[];
  lastCompletedExercise: CompletedExercise | null;
}

export type UserAction = {
  type:
    | "LOGIN"
    | "LOGOUT"
    | "REGISTER"
    | "UPDATE_USER_DETAILS"
    | "DELETE_USER"
    | "COMPLETE_EXERCISE";
  token?: string;
  userId?: string;
  userDetails?: UserProfile;
  exerciseId?: string;
  answers?: FollowupAnswers;
};
