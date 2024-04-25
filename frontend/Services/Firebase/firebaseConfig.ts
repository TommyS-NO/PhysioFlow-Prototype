import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const registerUser = async (email: string, password: string): Promise<string | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    const authError = error as Error;
  console.error("Registreringsfeil:", authError.message);
    return null;
  }
};

const saveUserProfile = async (userId: string, profile: UserProfile): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", userId), profile);
    return true;
  } catch (error) {
    console.error("Feil ved lagring av brukerprofil:", error);
    return false;
  }
};

const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), updates);
  } catch (error) {
    console.error("Feil ved oppdatering av brukerprofil:", error);
  }
};

const fetchUserDetailsFromFirestore = async (userId: string): Promise<UserProfile | undefined> => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
    console.log("Ingen brukerprofil funnet.");
    return undefined;
};

const subscribeToUserProfile = (userId: string, setUserProfile: (profile: UserProfile) => void) => {
  return onSnapshot(doc(db, "users", userId), (document) => {
    if (document.exists()) {
      setUserProfile(document.data() as UserProfile);
    } else {
      console.error("Ingen brukerprofil funnet.");
    }
  }, (error) => {
    console.error("Feil ved abonnement på brukerprofil:", error);
  });
};

const deleteUserAccount = async (userId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "users", userId));
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await firebaseDeleteUser(auth.currentUser);
    }
    return true;
  } catch (error) {
    console.error("Feil ved sletting av brukerkonto:", error);
    return false;
  }
};

export {
  app,
  auth,
  db,
  storage,
  registerUser,
  saveUserProfile,
  updateUserProfile,
  fetchUserDetailsFromFirestore,
  subscribeToUserProfile,
  deleteUserAccount,
};
