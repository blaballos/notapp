import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOrbtxFBlKgE9SSqzszje3TzhP-fLaqy8",
  authDomain: "notapp-6972d.firebaseapp.com",
  projectId: "notapp-6972d",
  storageBucket: "notapp-6972d.firebasestorage.app",
  messagingSenderId: "491189890964",
  appId: "1:491189890964:web:4a1cc1f310f3b6637c2981"
};

const provider = new GoogleAuthProvider()
const auth = getAuth()
signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
    }).catch((err) => {
        const errCode = err.errCode
        const errMessage = err.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(err)
    })
