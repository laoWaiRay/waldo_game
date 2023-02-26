console.log("Importing Firebase configuration...");

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "waldogame-dda5b.firebaseapp.com",
  projectId: "waldogame-dda5b",
  storageBucket: "waldogame-dda5b.appspot.com",
  messagingSenderId: "689111774280",
  appId: "1:689111774280:web:90518718f4b2d112b4d47d"
};

export function getFirebaseConfig() {
  if (!config.apiKey)
    console.log('no api key');
  if (!config)
    console.log('no config');

  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}