type SurveyId = string;
type Answers = Record<string, string | number>;

const BASE_URL = process.env.REACT_APP_BASE_URL;
const handleResponse = async (response: Response) => {
  if (!response.ok) {

    const errorData = await response.json().catch(() => ({ message: "Unable to parse error response" }));
    throw new Error(errorData.message || 'An unknown error occurred.');
  }
  return response.json();
};

const translateSurveyId = (surveyId: SurveyId): string => {
  const surveyIdMap: Record<SurveyId, string> = {
    Nakke: 'neck',
    Skulder: 'shoulder',
    Ankel: 'ankle',
    Albue: 'elbow',
    Hofte: 'hip',
    Kne: 'knee',
    Nedre_rygg: 'lowBack',
    Øvre_rygg: 'upperBack',
    Håndledd: 'wrist',
    Oppfølging: 'followup'
  };
  return surveyIdMap[surveyId] || surveyId;
};

const apiService = {
  getSurvey: async (surveyId: SurveyId) => {
    const translatedSurveyId = translateSurveyId(surveyId);
    const response = await fetch(`${BASE_URL}/api/survey/${translatedSurveyId}`);
    return handleResponse(response);
  },

  submitSurvey: async (surveyId: SurveyId, answers: Answers) => {
    const translatedSurveyId = translateSurveyId(surveyId);
    const response = await fetch(`${BASE_URL}/api/survey/evaluate/${translatedSurveyId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    return handleResponse(response);
  },

  getAllExercises: async () => {
    const response = await fetch(`${BASE_URL}/api/exercises`);
    return handleResponse(response);
  },

  getExerciseDetails: async (exerciseNames: string[]) => {
    const response = await fetch(`${BASE_URL}/api/exercises/details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exercises: exerciseNames }),
    });
    return handleResponse(response);
  },

  startAIChat: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/api/chat/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return handleResponse(response);
  },

  sendMessageToAIChat: async (chatId: string, message: string) => {
    const response = await fetch(`${BASE_URL}/api/chat/${chatId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return handleResponse(response);
  },
};

export { apiService };
