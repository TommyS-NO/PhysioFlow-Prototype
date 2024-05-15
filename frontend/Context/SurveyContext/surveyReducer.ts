import { SurveyQuestion, Answer, Diagnosis } from "./surveyTypes";

export interface SurveyState {
  surveyId: string;
  questions: SurveyQuestion[];
  answers: Record<string, Answer>;
  diagnoses: Diagnosis[];
  loading: boolean;
}

export type SurveyAction =
  | { type: "LOAD_SURVEY"; surveyId: string; questions: SurveyQuestion[] }
  | { type: "ANSWER_QUESTION"; questionId: string; answer: Answer }
  | { type: "RESET_SURVEY" }
  | { type: "SAVE_DIAGNOSIS"; diagnosis: Diagnosis }
  | { type: "REMOVE_DIAGNOSIS"; diagnosisId: string }
  | { type: "LOAD_DIAGNOSES"; diagnoses: Diagnosis[] }
  | { type: "SET_LOADING"; loading: boolean };

export const initialState: SurveyState = {
  surveyId: "",
  questions: [],
  answers: {},
  diagnoses: [],
  loading: false,
};

const surveyReducer = (state: SurveyState, action: SurveyAction): SurveyState => {
  switch (action.type) {
    case "LOAD_SURVEY":
      return {
        ...state,
        surveyId: action.surveyId,
        questions: action.questions,
      };
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        },
      };
    case "RESET_SURVEY":
      return initialState;
    case "SAVE_DIAGNOSIS":
      return {
        ...state,
        diagnoses: [...state.diagnoses, action.diagnosis],
      };
    case "REMOVE_DIAGNOSIS":
      return {
        ...state,
        diagnoses: state.diagnoses.filter((d) => d.id !== action.diagnosisId),
      };
    case "LOAD_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.diagnoses,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default surveyReducer;
