import { set } from "astro/zod";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBOrbtxFBlKgE9SSqzszje3TzhP-fLaqy8",
  authDomain: "notapp-6972d.firebaseapp.com",
  projectId: "notapp-6972d",
  storageBucket: "notapp-6972d.firebasestorage.app",
  messagingSenderId: "491189890964",
  appId: "1:491189890964:web:4a1cc1f310f3b6637c2981"
};

const app = initializeApp(firebaseConfig);
const fs = firebase.firestore()

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(app);
  const loginButton = document.getElementById("login");
  const loginButtonIndex = document.getElementById("login-index");
  const registerButtonIndex = document.getElementById("register-index");
  const registerButtonHero = document.getElementById("register-hero");
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
          if (loginButtonIndex) {
            signOutButton.style.display = 'none'
            loginButtonIndex.style.display = 'inline-flex'
            registerButtonIndex.style.display = 'inline-flex'
            registerButtonHero.style.display = 'inline-flex'
          }
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
        if (signOutButton) {
          signOutButton.style.display = 'inline-flex'
          loginButtonIndex.style.display = 'none'
          registerButtonIndex.style.display = 'none'
          registerButtonHero.style.display = 'none'
        }
        window.open('/');
      } else {
        auth.signOut();
      }
    } else {
      console.log("usuario inactivo")
    }
  });
});

// NEW SIGN IN CODE

const signinForm = document.querySelector('#signin-form')

signinForm.addEventListener('sumbit', (e) => {
  e.preventDefault()

  const email = document.querySelector('#signin-email')
  const password = document.querySelector('#signin-password')

  auth.signInWithEmailAndPassword(email, password).then(userCredential => {
    signinForm.reset()
  })
})

// NEW SIGN OUT CODE

const logoutButton = document.querySelector('#logout')

logoutButton.addEventListener('click', e => {
  e.preventDefault()

  auth.signOut().then(()=> {
    console.log('sign Out') 
  })
})

// DATABASE CODE

const cardContainer = document.querySelector('card-container')

const setupCards = data => {
  if (data.length) {
    let html = ''
    data.forEach(doc => {
      const post = doc.data()
      const card = `
            <article class="w-full">
                <div class="w-full bg-[#14202E] py-2 rounded-xl max-w-[272px] flex flex-col items-start px-2">
                    <div class="w-full flex items-center justify-between mb-2">
                        <textarea name="titleCard" id="titleCard" rows="1" class="bg-transparent text-white text-md font-semibold rounded-lg px-2 border-none focus:outline-none resize-none">${post.titleTable}</textarea>
                    </div>
                    <div class="w-full">
                        <form class="flex justify-between items-center">
                            <input type="text" placeholder="Agregar tarea..." class="input-item bg-[#14202E] text-gray-400 outline-none px-2">
                            <button class="add-item-button w-8 h-8 flex items-center justify-center bg-[#14202E] text-white text-md p-2 rounded-xl hover:bg-gray-400/50 transition duration-200">+</button>
                        </form>
                    </div>
                    <div class="w-full">
                        <ul class="items-list w-full">

                        </ul>
                    </div>
                </div>
            </article>
        `;

        html += card

        cardContainer.innerHTML = html;
    })
  } else {
    cardContainer.innerHTML = '<p class="text-5xl">NO PUBLICACIONES</p>'
  }
}



// EVENTS

auth.onAuthStateChanged(user => {
  if (user) {
    fs.collection('tableros').get().then((snapshot) => {
      setupCards(snapshot.docs)
    })
  } else {
    setupCards([])
  }
})

// login with google

const googleButton = document.querySelector('#sigin-google')

googleButton.addEventListener('click', (e) => {
  e.preventDefault()

  const provider = auth.GoogleAuthProvider() 

  auth.signInWithPopup(provider).then(result => {
    console.log('iniciado con google')
  }).catch(err => {
    console.log(err)
  })
})