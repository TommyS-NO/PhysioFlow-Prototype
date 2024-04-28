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

};

export { apiService };