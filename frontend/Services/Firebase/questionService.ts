import { db } from './firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export interface Question {
  area: string;
  id: string;
  text: string;
  options: string[];
  followUp?: { [key: string]: string };
}

// Hente alle generelle spørsmål fra Firestore
const fetchGeneralQuestions = async (): Promise<Question[]> => {
  const docRef = doc(db, 'questions', 'general');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.questions as Question[];
  }
    console.error("Generelle spørsmål ble ikke funnet.");
    return [];
};

// Hente alle spørsmål for et gitt fokusområde
const fetchQuestionsByFocusArea = async (focusArea: string): Promise<Question[]> => {
  const q = query(collection(db, "focusAreas"), where("name", "==", focusArea));
  const querySnapshot = await getDocs(q);
  const focusAreaData = querySnapshot.docs.map(doc => doc.data())[0];
  const followUpQuestionsIds = focusAreaData?.followUps;
  const questions: Question[] = [];


  if (followUpQuestionsIds) {
    for (const [key, value] of Object.entries(followUpQuestionsIds)) {
      const followUpRef = doc(db, "questionsById", value as string);
      const followUpSnap = await getDoc(followUpRef);

      if (followUpSnap.exists()) {
        questions.push(followUpSnap.data() as Question);
      } else {
        console.error(`Follow-up question with ID ${value} was not found.`);
      }
    }
  }

  return questions;
};

// Funksjon for å hente neste spørsmål basert på svaret til brukeren
const fetchNextQuestion = async (currentQuestionId: string, answer: string): Promise<Question | null> => {
  const currentQuestionRef = doc(db, "questionsById", currentQuestionId);
  const currentQuestionSnap = await getDoc(currentQuestionRef);

  if (currentQuestionSnap.exists()) {
    const currentQuestionData = currentQuestionSnap.data() as Question;
    const nextQuestionId = currentQuestionData.followUp?.[answer];

    if (nextQuestionId) {
      const nextQuestionRef = doc(db, "questionsById", nextQuestionId);
      const nextQuestionSnap = await getDoc(nextQuestionRef);

      if (nextQuestionSnap.exists()) {
        return nextQuestionSnap.data() as Question;
      }
    }
  }
  console.error(`Next question based on answer "${answer}" was not found.`);
  return null;
};

export { fetchGeneralQuestions, fetchQuestionsByFocusArea, fetchNextQuestion };
