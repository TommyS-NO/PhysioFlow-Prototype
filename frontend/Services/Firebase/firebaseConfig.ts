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
  onSnapshot,
} from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


import { API_KEY, AUTH_DOMAIN, PROJECT_ID, MESSAGING_SENDER_ID, APP_ID } from '@env';

// Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Register User function with async/await and error handling
const registerUser = async (email: string, password: string): Promise<string | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    const firebaseError = error as AuthError;
    console.error("Registration Error:", firebaseError.message);
    return null;
  }
};

// Function to save user profile with async/await
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const  saveUserProfile = async (userId: string, profile: any): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", userId), profile);
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return false;
  }
};

// Update User Profile function with async/await
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const  updateUserProfile = async (userId: string, updates: Record<string, any>): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", userId), updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

// Subscribe to User Profile function using onSnapshot for real-time updates
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const  subscribeToUserProfile = (userId: string, setUserProfile: (profile: any) => void) => {
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

// Delete User Account function with async/await and error handling
const deleteUserAccount = async (userId: string): Promise<boolean> => {
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

// Upload Profile Image
// const uploadProfileImage = async (userId: string, imageUri: string): Promise<string> => {
//   const imageRef = storageRef(storage, `profile_images/${userId}`);
//   const response = await fetch(imageUri);
//   const blob = await response.blob();

//   await uploadBytes(imageRef, blob);
//   const downloadURL = await getDownloadURL(imageRef);

//   await updateDoc(doc(db, "users", userId), { profileImageUrl: downloadURL });
//   return downloadURL;
// };


export {
  app,
  auth,
  db,
  storage,
  registerUser,
  saveUserProfile,
  updateUserProfile,
  subscribeToUserProfile,
  deleteUserAccount,
};
