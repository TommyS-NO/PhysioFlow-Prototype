import { UserState, UserAction, FollowupAnswers, CompletedExercise, UserProfile } from './userTypes';

export const initialState: UserState = {
  isLoggedIn: false,
  token: null,
  userDetails: null,
  userId: null,
  completedExercises: [],
  lastCompletedExercise: null,
};

export const userReducer = (state: UserState, action: UserAction): UserState => {
		switch (action.type) {
			case "LOGIN":
				return {
					...state,
					isLoggedIn: true,
					token: action.token ?? state.token,
					userId: action.userId ?? state.userId,
					userDetails: {
						...state.userDetails,
						...action.userDetails,
					} as UserProfile,
				};
			case "LOGOUT":
			case "DELETE_USER":
				return initialState;
			case "REGISTER":
				return {
					...state,
					userDetails: action.userDetails ?? state.userDetails,
				};
			case "UPDATE_USER_DETAILS":
				return {
					...state,
					userDetails: { ...state.userDetails, ...action.userDetails },
				};
			case "COMPLETE_EXERCISE":
				if (action.exerciseId && action.answers) {
					const existingIndex = state.completedExercises.findIndex(
						(ex) => ex.exerciseId === action.exerciseId,
					);
					const newCompletedExercise: CompletedExercise = {
						exerciseId: action.exerciseId,
						answers: action.answers,
						completedAt: new Date().toISOString(),
					};
					let updatedCompletedExercises = [...state.completedExercises];
					if (existingIndex >= 0) {
						updatedCompletedExercises[existingIndex] = newCompletedExercise; 
					} else {
						updatedCompletedExercises = [
							...updatedCompletedExercises,
							newCompletedExercise,
						];
					}
					return {
						...state,
						completedExercises: updatedCompletedExercises,
						lastCompletedExercise: newCompletedExercise,
					};
				}
				return state;
		}
	};
