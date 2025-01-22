import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOrbtxFBlKgE9SSqzszje3TzhP-fLaqy8",
  authDomain: "notapp-6972d.firebaseapp.com",
  projectId: "notapp-6972d",
  storageBucket: "notapp-6972d.firebasestorage.app",
  messagingSenderId: "491189890964",
  appId: "1:491189890964:web:4a1cc1f310f3b6637c2981"
};

const app = initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(app);

  const registerButton = document.getElementById("register");

  if (registerButton) {
    registerButton.addEventListener("click", (e) => {
      e.preventDefault();

      const email = document.getElementById("email-register").value;
      const password = document.getElementById("password-register").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          alert("Usuario creado");
          return sendEmailVerification(auth.currentUser);
        })
        .then(() => {
          alert("Correo de verificación enviado");
        })
        .catch((err) => {
          const errorCode = err.code;

          if (errorCode === "auth/email-already-in-use") alert("Correo ya en uso");
          else if (errorCode === "auth/invalid-email") alert("Correo inválido");
          else if (errorCode === "auth/weak-password") alert("Contraseña débil");
        });
    });
  } else {
    console.error("Botón de registro no encontrado.");
  }
});

// NEW SIGN UP CODE

const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('sumbit', (e) => {
  e.preventDefault()

  email = document.querySelector('#signup-email').value
  password = document.querySelector('#signup-password').value

  auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
    signupForm.reset()
  })
})