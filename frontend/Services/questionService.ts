type FocusArea = string;
type QuestionId = string;
type Answer = string;

const BASE_URL = process.env.REACT_APP_BASE_URL;

const questionService = {
  getGeneralQuestions: async () => {
    console.log("Fetching general questions...");
    try {
      const response = await fetch(`${BASE_URL}/api/questions/general`);
      if (!response.ok) {
        throw new Error("Failed to fetch general questions.");
      }
      const data = await response.json();
      console.log("Fetched general questions:", data);
      return data;
    } catch (error) {
      console.error("Error fetching general questions:", error);
      throw error;
    }
  },

  getQuestionsByFocusArea: async (focusArea: FocusArea) => {
    console.log(`Fetching questions for focus area ${focusArea}...`);
    try {
      const response = await fetch(`${BASE_URL}/api/questions/focusAreas/${focusArea}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch questions for focus area: ${focusArea}`);
      }
      const data = await response.json();
      console.log(`Fetched questions for focus area ${focusArea}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching questions for focus area ${focusArea}:`, error);
      throw error;
    }
  },

  getIndividualQuestion: async (focusArea: FocusArea, questionId: QuestionId) => {
    console.log(`Fetching individual question ${questionId} for focus area ${focusArea}...`);
    try {
      const response = await fetch(`${BASE_URL}/api/questions/focusAreas/${focusArea}/${questionId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch questions for focus area: ${focusArea}`);
      }
      const data = await response.json();
      console.log(`Fetched individual question ${questionId} for focus area ${focusArea}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching questions for focus area ${focusArea}:`, error);
      throw error;
    }
  },

  getFollowUpQuestions: async (focusArea: FocusArea, questionId: QuestionId) => {
     console.log(`Fetching follow-up questions for question ${questionId} in focus area ${focusArea}...`);
     try {
      const response = await fetch(`${BASE_URL}/api/questions/focusAreas/${focusArea}/${questionId}/followUp`);
      if (!response.ok) {
        throw new Error(`Failed to fetch questions for focus area: ${focusArea}`);
      }
      const data = await response.json();
      console.log(`Fetched follow-up questions for question ${questionId} in focus area ${focusArea}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching questions for focus area ${focusArea}:`, error);
      throw error;
    }
  },

  handleAnswer: async (focusArea: FocusArea, questionId: QuestionId, answer: Answer) => {
     console.log(`Handling answer for question ${questionId} in focus area ${focusArea}...`);
     try {
      const response = await fetch(`${BASE_URL}/api/questions/focusAreas/${focusArea}/${questionId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      });
      if (!response.ok) {
       throw new Error(`Failed to handle answer for question ${questionId} in focus area ${focusArea}: ${error.message}`);

      }
      const data = await response.json();
      console.log(`Handled answer for question ${questionId} in focus area ${focusArea}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching questions for focus area ${focusArea}:`, error);
      throw error;
    }
  },
};

export { questionService };
