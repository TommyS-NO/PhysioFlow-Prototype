import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
  AuthError,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID } from '@env';


// Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};
// Initialize Firebaseg
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

// Register User
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

// Save User Profile
export const saveUserProfile = async (userId: string, profile: any): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", userId), profile);
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return false;
  }
};

// Update User Profile
export const updateUserProfile = async (userId: string, updates: Record<string, any>): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

// Subscribe to User Profile
export const subscribeToUserProfile = (userId: string, setUserProfile: (profile: any) => void) => {
  return onSnapshot(doc(db, "users", userId), (document) => {
    if (document.exists()) {
      setUserProfile(document.data());
    } else {
      console.error("No user profile found");
    }
  }, (error) => {
    console.error("Error subscribing to user profile:", error);
  });
};

// Delete User Account
export const deleteUserAccount = async (userId: string): Promise<boolean> => {
  try {
  
    await deleteDoc(doc(db, "users", userId));

 
    if (auth.currentUser?.uid === userId) {
      await firebaseDeleteUser(auth.currentUser);
    }
    
    return true;
  } catch (error) {
    const firebaseError = error as AuthError;
    console.error("Error deleting user account:", firebaseError.message);
    return false;
  }
};


