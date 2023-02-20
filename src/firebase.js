import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseApp = initializeApp(getFirebaseConfig());
const firestore = getFirestore();
const storage = getStorage();

export { firebaseApp, firestore, storage };