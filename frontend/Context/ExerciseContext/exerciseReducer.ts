import { Exercise } from './exerciseTypes';

export type ExerciseState = {
  userExercises: Exercise[];
  completedExercises: Exercise[];
  loading: boolean;
  error: string | null;
};

export type ExerciseAction =
  | { type: "SET_USER_EXERCISES"; payload: Exercise[] }
  | { type: "SET_COMPLETED_EXERCISES"; payload: Exercise[] }
  | { type: "ADD_EXERCISE"; payload: Exercise }
  | { type: "REMOVE_EXERCISE"; id: string }
  | {
      type: "UPDATE_EXERCISE_STATUS";
      id: string;
      status: "pending" | "completed";
      completedAt?: string;
    }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_ERROR"; error: string | null };

export const initialState: ExerciseState = {
  userExercises: [],
  completedExercises: [],
  loading: false,
  error: null,
};

const exerciseReducer = (state: ExerciseState, action: ExerciseAction): ExerciseState => {
  switch (action.type) {
    case "SET_USER_EXERCISES":
      return { ...state, userExercises: action.payload, loading: false };
    case "SET_COMPLETED_EXERCISES":
      return { ...state, completedExercises: action.payload, loading: false };
    case "ADD_EXERCISE":
      return {
        ...state,
        userExercises: [...state.userExercises, action.payload],
      };
    case "REMOVE_EXERCISE":
      return {
        ...state,
        userExercises: state.userExercises.filter((ex) => ex.id !== action.id),
      };
    case "UPDATE_EXERCISE_STATUS": {

    const updatedUserExercises = state.userExercises.map((ex) =>
        ex.id === action.id ? { ...ex, status: action.status, completedAt: action.completedAt } : ex
    );
    const newUserExercises = updatedUserExercises.filter(
        (ex) => ex.id !== action.id || ex.status !== "completed"
    );
    const completedExercise = updatedUserExercises.find(
        (ex) => ex.id === action.id && ex.status === "completed"
    );
    const newCompletedExercises = completedExercise
        ? [...state.completedExercises.filter((ex) => ex.id !== action.id), completedExercise]
        : [...state.completedExercises];

    return {
        ...state,
        userExercises: newUserExercises,
        completedExercises: newCompletedExercises
    };
}

    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default exerciseReducer;
