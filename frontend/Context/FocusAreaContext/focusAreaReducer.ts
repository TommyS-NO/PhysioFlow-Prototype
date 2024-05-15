export type FocusAreaKey =
  | "Nakke"
  | "Skulder"
  | "Albue"
  | "Håndledd"
  | "Øvre_rygg"
  | "Nedre_rygg"
  | "Hofte"
  | "Kne"
  | "Ankel";

export interface FocusAreaState {
  currentFocusArea: FocusAreaKey | null;
  selectedAreas: { [key in FocusAreaKey]?: boolean };
}

export type FocusAreaAction =
  | { type: "SET_AREA"; area: FocusAreaKey; isSelected: boolean }
  | { type: "CLEAR_AREAS" }
  | { type: "SET_CURRENT_FOCUS_AREA"; area: FocusAreaKey };

export const initialState: FocusAreaState = {
  currentFocusArea: null,
  selectedAreas: {},
};

const focusAreaReducer = (
  state: FocusAreaState,
  action: FocusAreaAction,
): FocusAreaState => {
  switch (action.type) {
    case "SET_AREA":
      return {
        ...state,
        selectedAreas: {
          ...state.selectedAreas,
          [action.area]: action.isSelected,
        },
      };
    case "SET_CURRENT_FOCUS_AREA":
      return {
        ...state,
        currentFocusArea: action.area,
        selectedAreas: {
          ...state.selectedAreas,
          [action.area]: true,
        },
      };
    case "CLEAR_AREAS":
      return {
        ...state,
        currentFocusArea: null,
        selectedAreas: {},
      };
    default:
      return state;
  }
};

export default focusAreaReducer;
