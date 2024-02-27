import { initializeApp } from "firebase/app";
import { indexedDBLocalPersistence, initializeAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDnWSGdTeP1OrAkyzue-gUb4K1aF-yI7Mk",
  authDomain: "habit-tracker-b09af.firebaseapp.com",
  projectId: "habit-tracker-b09af",
  storageBucket: "habit-tracker-b09af.appspot.com",
  messagingSenderId: "606642728247",
  appId: "1:606642728247:web:23d9c3b6f44a2a65b4beb2"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
})

// export const auth = getAuth(app);