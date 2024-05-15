import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  Auth,
  deleteUser
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore, Firestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot,
  getDoc, addDoc, collection, getDocs, writeBatch
} from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID } from '@env';
import { Exercise } from '../../Context/ExerciseContext/exerciseTypes';

interface CommonAttributes {
  id: string;
  initialized?: boolean;
}

interface UserProfile extends CommonAttributes {
  username?: string;
  email: string;
  gender?: 'male' | 'female' | 'unspecified';
  height?: number;
  weight?: number;
  birthday?: string;
  profileImageUrl?: string;
}

interface Diagnosis extends CommonAttributes {
  diagnosis: string;
  title: string;
  description: string;
  exercises: string[];
  timestamp: string;
}

interface UserExercise extends CommonAttributes {
  name: string;
  description: string;
  image: string;
  category: string;
  status?: "pending" | "completed";
  completedAt?: string;
}

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

const subscribeToUserProfile = (userId: string, callback: (profile: UserProfile) => void) => {
  const docRef = doc(db, "users", userId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) callback(doc.data() as UserProfile);
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
  const userProfileRef = doc(db, "users", userId);
  const batch = writeBatch(db);
  batch.set(userProfileRef, { profileInitialized: true });
  batch.set(doc(userProfileRef, "completedExercises", "initial"), { initialized: true });
  batch.set(doc(userProfileRef, "diagnoses", "initial"), { initialized: true });
  batch.set(doc(userProfileRef, "userExercises", "initial"), { initialized: true });
  await batch.commit();
}

async function saveUserProfile(userId: string, profile: UserProfile): Promise<void> {
  await setDoc(doc(db, "users", userId), profile, { merge: true });
}

async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, "users", userId), updates);
}

const fetchUserDetailsFromFirestore = async (userId: string) => {
  const userProfile = await fetchDocument<UserProfile>("users", userId);
  const diagnoses = await fetchCollection<Diagnosis>("diagnoses", userId);
  const completedExercises = await fetchCollection<UserExercise>("completedExercises", userId);
  const userExercises = await fetchCollection<UserExercise>("userExercises", userId);
  return { userProfile, diagnoses, completedExercises, userExercises };
};

async function fetchDocument<T extends CommonAttributes>(collectionPath: string, docId: string): Promise<T | null> {
  const docRef = doc(db, collectionPath, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
}

async function fetchCollection<T extends CommonAttributes>(collectionName: string, userId: string): Promise<T[]> {
  const ref = collection(db, "users", userId, collectionName);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as T)).filter(item => !item.initialized);
}

async function addDiagnosis(userId: string, diagnosis: Diagnosis): Promise<void> {
  await addDoc(collection(db, "users", userId, "diagnoses"), diagnosis);
}

async function deleteDiagnosis(userId: string, diagnosisId: string): Promise<void> {
  await deleteDoc(doc(db, "users", userId, "diagnoses", diagnosisId));
}

async function addUserExercise(userId: string, exercise: Exercise) {
  const docRef = await addDoc(collection(db, "users", userId, "userExercises"), exercise);
  return docRef; 
}

async function updateUserExerciseStatus(userId: string, exerciseId: string, status: "pending" | "completed"): Promise<void> {
  await updateDoc(doc(db, "users", userId, "userExercises", exerciseId), {
    status,
    completedAt: status === "completed" ? new Date().toISOString() : null
  });
}

async function deleteUserExercise(userId: string, exerciseId: string): Promise<void> {
  await deleteDoc(doc(db, "users", userId, "userExercises", exerciseId));
}

async function deleteUserAccount(userId: string): Promise<boolean> {
  try {
    const batch = writeBatch(db);
    const userProfileRef = doc(db, "users", userId);
    
    const userExercisesSnapshot = await getDocs(collection(db, "users", userId, "userExercises"));
    for (const doc of userExercisesSnapshot.docs) {
      batch.delete(doc.ref);
    }

    const completedExercisesSnapshot = await getDocs(collection(db, "users", userId, "completedExercises"));
    for (const doc of completedExercisesSnapshot.docs) {
      batch.delete(doc.ref);
    }

    const diagnosesSnapshot = await getDocs(collection(db, "users", userId, "diagnoses"));
    for (const doc of diagnosesSnapshot.docs) {
      batch.delete(doc.ref);
    }

    batch.delete(userProfileRef);

    await batch.commit();

    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
    }

    return true;
  } catch (error) {
    console.error("Error deleting user account:", error);
    return false;
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
  fetchUserDetailsFromFirestore,
  subscribeToUserProfile,
  deleteUserExercise,
  addUserExercise,
  updateUserExerciseStatus,
  fetchCollection,
  deleteUserAccount
};
