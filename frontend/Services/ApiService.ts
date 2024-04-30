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
    return await response.json();
  },

submitSurvey: async (userId: string, surveyId: SurveyId, answers: Answers) => {
    const translatedSurveyId = translateSurveyId(surveyId);
    const response = await fetch(`${BASE_URL}/api/users/${userId}/completedExercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completedExercise: {
          id: translatedSurveyId,
          ...answers
        }
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit answers for survey ID: ${translatedSurveyId}`);
    }
    const survey = await response.json();
    console.log('Survey received:', survey);
    return survey;
  },

  
  getAllExercises: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/exercises`);
      if (!response.ok) {
        throw new Error('Failed to fetch all exercises');
      }
      const exercises = await response.json();
      console.log('Exercises received:', exercises);
      return exercises;
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
      if (!response.ok) {
        throw new Error('Failed to fetch exercise details');
      }
      const exerciseDetails = await response.json();
      console.log('Exercise details received:', exerciseDetails);
      return exerciseDetails;
    } catch (error) {
      console.error('Error fetching exercise details:', error);
      throw error;
    }
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
    const chatSession = await response.json();
    console.log('AI chat session started:', chatSession);
    return chatSession;
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
    const chatResponse = await response.json();
    console.log('AI chat response received:', chatResponse);
    return chatResponse;
  },
  getProgressData: async (userId: string, exerciseId: string) => {
    const url = `${BASE_URL}/api/users/${userId}/completedExercises/${exerciseId}/progress`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch progress data for user ID: ${userId} and exercise ID: ${exerciseId}`);
    }
    return await response.json();
},

};

export { apiService };
