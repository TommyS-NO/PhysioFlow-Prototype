export type SurveyId = string;

export interface SingleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  type: "singleChoice";
}

export interface SliderQuestion {
  title: string;
  maxValue: number;
  minValue: number;
  id: string;
  question: string;
  sliderMin: number;
  sliderMax: number;
  type: "slider";
}

export interface NumericInputQuestion {
  id: string;
  question: string;
  type: "numericInput";
}

export type SurveyQuestion = SingleChoiceQuestion | SliderQuestion | NumericInputQuestion;

export interface Answer {
  questionId: string;
  answer: string | number;
}

export interface Diagnosis {
  id: string;
  title: string;
  description: string;
  exercises: string[];
  timestamp: string;
  diagnosis?: string; 
}
