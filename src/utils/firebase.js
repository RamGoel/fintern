import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDz1iXq3Qsk_OybLoExWK83bU-6-InoUUM",
    authDomain: "evenger-add35.firebaseapp.com",
    projectId: "evenger-add35",
    storageBucket: "evenger-add35.appspot.com",
    messagingSenderId: "698869789204",
    appId: "1:698869789204:web:3e0d1ec5a1e7f292672d01"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)