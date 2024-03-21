import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, AuthError  } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const db = getFirestore(app);

export const registerUser = async (email: string, password: string): Promise<string | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid; 
  } catch (error) {
    const firebaseError = error as AuthError;
    console.error("Registration Error:", firebaseError.message);
    
    return null;
  }
};
export const saveUserProfile = async (userId: string, profile: any): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", userId), profile);
    return true; 
  } catch (error) {
    console.error("Error saving user profile:", error);

    return false;
  }
};
