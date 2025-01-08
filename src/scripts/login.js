import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
  const loginButton = document.getElementById("login");
  const signOutButton = document.getElementById("cerrar");

  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();

      const email = document.getElementById("email-login").value;
      const password = document.getElementById("password-login").value;

      signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
          alert("Sesión iniciada");
        })
        .catch(err => {
          const errorCode = err.code;

          if (errorCode === "auth/invalid-email") alert("Correo no válido");
          else if (errorCode == "auth/user-disabled") alert("Usuario deshabilitado");
          else if (errorCode == "auth/user-not-found") alert("Usuario no encontrado");
          else if (errorCode == "auth/wrong-password") alert("Contraseña incorrecta");
        });
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", (e) => {
      auth.signOut()
        .then(() => {
          alert("Sesión cerrada");
        })
        .catch(() => {
          alert("Error al cerrar la sesión");
        });
    });
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("Usuario activo");
      if (user.emailVerified) {
        window.open('/');
      } else {
        auth.signOut();
      }
    } else {
      console.log("usuario inactivo")
    }
  });
});