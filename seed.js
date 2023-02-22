import { initializeApp } from 'firebase/app'
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
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const config = {
  apiKey: "AIzaSyBaDxselkvqTQ5OlBj26Yjl-fSr6L1U9JY",
  authDomain: "waldogame-dda5b.firebaseapp.com",
  projectId: "waldogame-dda5b",
  storageBucket: "waldogame-dda5b.appspot.com",
  messagingSenderId: "689111774280",
  appId: "1:689111774280:web:90518718f4b2d112b4d47d"
};

function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}

const app = initializeApp(getFirebaseConfig());
const db = getFirestore();
const storage = getStorage();

// const mp3Ref = ref(storage, 'sound_effects/correct_beep.mp3');
// getDownloadURL(mp3Ref).then((url) => {
//   addDoc(collection(db, 'audio'), {
//     name: 'correct_beep',
//     url: url
//   })
// })

// for (let i = 1; i <= 19; i++)
// {
//   const q = query(collection(db, 'images'), where('id', '==', i));
//   getDocs(q).then((snapshot) => {
//     snapshot.forEach((doc) => {
//       const docRef = doc.ref;
//       // const imageRef = ref(storage, 'waldo/1.jpg');
//       updateDoc(docRef, {
//         x: 0,
//         y: 0
//       }).then(() => console.log(`updated ${i}`))
//     })
//   })
//   // const imageRef = ref(storage, `waldo/${i}.jpg`);
//   // getDownloadURL(imageRef).then((url) => {
//   //   addDoc(collection(db, "images"), {
//   //     url: url,
//   //     name: 'placeholder',
//   //     id: i
//   //   }).then((docRef) => {
//   //     console.log("Added doc to db with id:", docRef.id)
//   //   })
//   // })
// }

// console.log(app, firestore, storage);