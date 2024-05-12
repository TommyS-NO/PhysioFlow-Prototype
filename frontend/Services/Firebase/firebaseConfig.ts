import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import {
  getFirestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot,
  getDoc, addDoc, collection, getDocs, writeBatch
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID } from '@env';

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

const firebaseConfig = { apiKey: API_KEY, authDomain: AUTH_DOMAIN, projectId: PROJECT_ID, messagingSenderId: MESSAGING_SENDER_ID, appId: APP_ID };
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
const db = getFirestore(app);
const storage = getStorage(app);

const subscribeToUserProfile = (userId: string, callback: (profile: UserProfile) => void) => {
  const docRef = doc(db, "users", userId);
  return onSnapshot(docRef, doc => { if (doc.exists()) callback(doc.data() as UserProfile); });
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
  const completedExercises = await fetchCollection<CommonAttributes>("completedExercises", userId);
  const userExercises = await fetchCollection<UserExercise>("userExercises", userId);
  return { userProfile, diagnoses, completedExercises, userExercises };
};

async function fetchDocument<T extends CommonAttributes>(collectionPath: string, docId: string): Promise<T> {
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

async function addUserExercise(userId: string, exercise: UserExercise) {
  await addDoc(collection(db, "users", userId, "userExercises"), exercise);
}

async function updateUserExerciseStatus(userId: string, exerciseId: string, status: "pending" | "completed"): Promise<void> {
  await updateDoc(doc(db, "users", userId, "userExercises", exerciseId), { status, completedAt: status === "completed" ? new Date() : null });
}

async function deleteUserExercise(userId: string, exerciseId: string): Promise<void> {
  await deleteDoc(doc(db, "users", userId, "userExercises", exerciseId));
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
	updateUserExerciseStatus, fetchCollection
};
