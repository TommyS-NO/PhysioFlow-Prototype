import { db } from './firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface Answer {
  questionId: string;
  answer: string;
}

// Hente alle spørsmål for et gitt steg
const fetchQuestions = async (step: string): Promise<Question[]> => {
  const questionsCol = collection(db, 'questions', step, 'questionsList');
  const questionSnapshot = await getDoc(questionsCol);
  return questionSnapshot.docs.map(doc => doc.data() as Question);
};

// Lagre en brukers svar på et spørsmål
const saveAnswer = async (userId: string, step: string, answer: Answer): Promise<void> => {
  const answersRef = doc(db, 'users', userId, 'answers', step);
  await updateDoc(answersRef, { [answer.questionId]: answer.answer });
};

// Oppdatere et spørsmål i Firestore (kan gjøres via Firebase Console eller gjennom en admin-funksjon)
const updateQuestion = async (step: string, questionId: string, question: Partial<Question>): Promise<void> => {
  const questionRef = doc(db, 'questions', step, 'questionsList', questionId);
  await updateDoc(questionRef, question);
};

export {
  fetchQuestions,
  saveAnswer,
  updateQuestion,
};
