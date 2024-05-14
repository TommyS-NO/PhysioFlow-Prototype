type SurveyId = 'Nakke' | 'Skulder' | 'Ankel' | 'Albue' | 'Hofte' | 'Kne' | 'Nedre_rygg' | 'Øvre_rygg' | 'Håndledd' | 'Oppfølging';
type Answers = Record<string, string | number>;

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Unable to parse error response" }));
    throw new Error(errorData.message || 'An unknown error occurred.');
  }
  const data = await response.json();
  
  // Format surveyId if present
  if (data.surveyId) {
    data.surveyId = formatSurveyId(data.surveyId);
  }
  
  return data;
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

const formatSurveyId = (surveyId: string): string => {
  return surveyId.replace(/_/g, " ");
};

const apiService = {
  getSurvey: async (surveyId: SurveyId) => {
    try {
      const translatedSurveyId = translateSurveyId(surveyId);
      const response = await fetch(`${BASE_URL}/api/survey/${translatedSurveyId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching survey:', error);
      throw error;
    }
  },

  submitSurvey: async (surveyId: SurveyId, answers: Answers) => {
    try {
      const translatedSurveyId = translateSurveyId(surveyId);
      const response = await fetch(`${BASE_URL}/api/survey/evaluate/${translatedSurveyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error submitting survey:', error);
      throw error;
    }
  },

  getAllExercises: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/exercises`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching all exercises:', error);
      throw error;
    }
  },

  getExerciseDetails: async (exerciseNames: string[]) => {
    try {
      const response = await fetch(`${BASE_URL}/api/exercises/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercises: exerciseNames }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching exercise details:', error);
      throw error;
    }
  },

  startAIChat: async (userId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error starting AI chat:', error);
      throw error;
    }
  },

  sendMessageToAIChat: async (chatId: string, message: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error sending message to AI chat:', error);
      throw error;
    }
  },
};

export { apiService };
