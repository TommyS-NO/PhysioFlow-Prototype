type SurveyId = string;
type Answers = Record<string, string | number>;

const BASE_URL = process.env.REACT_APP_BASE_URL;

const translateSurveyId = (surveyId: SurveyId): string => {
  const surveyIdMap: Record<string, string> = {
    Nakke: 'neck',
    Skulder: "shoulder"
 
  };
  return surveyIdMap[surveyId] || surveyId;
};

const surveyService = {
  getSurvey: async (surveyId: SurveyId) => {
    const translatedSurveyId = translateSurveyId(surveyId);

    console.log(`Fetching survey with ID: ${translatedSurveyId}...`);
    try {
      const response = await fetch(`${BASE_URL}/api/survey/${translatedSurveyId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch survey with ID: ${translatedSurveyId}`);
      }
      const data = await response.json();
      console.log("Fetched survey:", data);
      return data;
    } catch (error) {
      console.error("Error fetching survey:", error);
      throw error;
    }
  },

  submitSurvey: async (surveyId: SurveyId, answers: Answers) => {
    const translatedSurveyId = translateSurveyId(surveyId);
    
    console.log(`Submitting answers for survey ID: ${translatedSurveyId}...`, answers);
    try {
      const response = await fetch(`${BASE_URL}/api/survey/evaluate/${translatedSurveyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      if (!response.ok) {
        throw new Error(`Failed to submit answers for survey ID: ${translatedSurveyId}`);
      }
      const data = await response.json();
      console.log(`Submitted answers for survey ID: ${translatedSurveyId}:`, data);
      return data;
    } catch (error) {
      console.error("Error submitting answers for survey:", error);
      throw error;
    }
  },
};

export { surveyService };
