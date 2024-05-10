import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID } from '@env';

interface UserProfile {
  username?: string;
  email: string;
  gender?: 'male' | 'female' | 'unspecified';
  height?: number;
  weight?: number;
  birthday?: string;
  profileImageUrl?: string;
}

interface Diagnosis {
  id?: string;
  title: string;
  description: string;
  exercises: string[];
  timestamp: string;
}

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
const db = getFirestore(app);
const storage = getStorage(app);

//----------User Management Functions----------//

const subscribeToUserProfile = (userId: string, callback: (profile: UserProfile) => void) => {
  const docRef = doc(db, "users", userId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as UserProfile);
    }
  });
};



async function registerUser(email: string, password: string): Promise<string | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    await initializeUserCollections(userId);
    return userId;
  } catch (error) {
    console.error("Registration Error:", error);
    return null;
  }
}

async function initializeUserCollections(userId: string) {
  try {
    const userProfile = doc(db, "users", userId);
    await setDoc(userProfile, {});
    await setDoc(doc(userProfile, "completedExercises", "initial"), { initialized: true });
    await setDoc(doc(userProfile, "diagnoses", "initial"), { initialized: true });
  } catch (error) {
    console.error("Error initializing user collections:", error);
  }
}

async function saveUserProfile(userId: string, profile: UserProfile): Promise<void> {
  try {
    await setDoc(doc(db, "users", userId), profile, { merge: true });
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
}

async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    await updateDoc(doc(db, "users", userId), updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
}

const fetchUserDetailsFromFirestore = async (userId: string) => {
  try {
    const userProfileRef = doc(db, "users", userId);
    const userProfileSnap = await getDoc(userProfileRef);
    let userProfile = {};
    if (userProfileSnap.exists()) {
      userProfile = userProfileSnap.data();
      console.log("Brukerprofil hentet:", userProfile);
    } else {
      console.log("Ingen brukerprofil funnet for ID:", userId);
    }

    const diagnosesRef = collection(db, "users", userId, "diagnoses");
    const diagnosisSnapshot = await getDocs(diagnosesRef);
    const diagnoses = diagnosisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Diagnoser hentet:", diagnoses);

    const exercisesRef = collection(db, "users", userId, "completedExercises");
    const exercisesSnapshot = await getDocs(exercisesRef);
    const completedExercises = exercisesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Gjennomførte øvelser hentet:", completedExercises);

    return { userProfile, diagnoses, completedExercises };
  } catch (error) {
    console.error("Feil under henting av brukerdetaljer fra Firestore:", error);
    return { userProfile: {}, diagnoses: [], completedExercises: [] };
  }
};


async function addDiagnosis(userId: string, diagnosis: Diagnosis): Promise<void> {
  try {
    await addDoc(collection(db, "users", userId, "diagnoses"), diagnosis);
  } catch (error) {
    console.error("Error adding diagnosis:", error);
  }
}

async function deleteDiagnosis(userId: string, diagnosisId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "users", userId, "diagnoses", diagnosisId));
  } catch (error) {
    console.error("Error deleting diagnosis:", error);
  }
}

async function fetchCompletedExercises(userId: string) {
  try {
    const exercisesRef = collection(db, "users", userId, "completedExercises");
    const snapshot = await getDocs(exercisesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching completed exercises:", error);
    return [];
  }
}

export {
  app,
  auth,
  db,
  storage,
  registerUser,
  saveUserProfile,
  updateUserProfile,
  addDiagnosis,
  deleteDiagnosis,
  fetchCompletedExercises,
  fetchUserDetailsFromFirestore,
  subscribeToUserProfile
};
