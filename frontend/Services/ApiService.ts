type SurveyId = string;
type Answers = Record<string, string | number>;

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    if (!response.ok) {
      throw new Error(`Failed to fetch survey with ID: ${translatedSurveyId}`);
    }
    return response.json();
  },

  submitSurvey: async (surveyId: SurveyId, answers: Answers) => {
    const translatedSurveyId = translateSurveyId(surveyId);
    const response = await fetch(`${BASE_URL}/api/survey/evaluate/${translatedSurveyId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit answers for survey ID: ${translatedSurveyId}`);
    }
    return response.json();
  },

  getAllExercises: async () => {
    const response = await fetch(`${BASE_URL}/api/exercises`);
    if (!response.ok) {
      throw new Error('Failed to fetch all exercises');
    }
    return response.json();
  },

  getExerciseDetails: async (exerciseNames: string[]) => {
    const response = await fetch(`${BASE_URL}/api/exercises/details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exercises: exerciseNames }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch exercise details');
    }
    return response.json();
  },

  startAIChat: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/api/chat/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error(`Failed to start AI chat for user ID: ${userId}`);
    }
    return response.json();
  },

  sendMessageToAIChat: async (chatId: string, message: string) => {
    const response = await fetch(`${BASE_URL}/api/chat/${chatId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error(`Failed to send message to AI chat with chat ID: ${chatId}`);
    }
    return response.json();
  },
};

export { apiService };
