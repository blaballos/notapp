import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
    const googleButton = document.getElementById("googleButton");
    const signInButton = document.getElementById("signInButton");
    const signOutButton = document.getElementById("signOutButton");

    const signInButtonMain = document.getElementById("signInButtonMain");
    const signUpButtonMain = document.getElementById("signUpButtonMain");
    const signUpButtonHero = document.getElementById("signUpButtonHero");

    const emailAlert = document.getElementById('email-alert')
    const passwordAlert = document.getElementById('password-alert')
    const span = document.createElement('span')

    if (googleButton) {
        googleButton.addEventListener("click", (e) => {
            e.preventDefault();

            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log("Sesión iniciada con Google:", result.user);
                    window.location.href = "/";
                })
                .catch((err) => {
                    console.log("Error al iniciar sesión con Google:", err);
                });
        });
    }

    if (signInButton) {
        signInButton.addEventListener("click", (e) => {
            e.preventDefault();

            const email = document.getElementById("email-sign-in").value;
            const password = document.getElementById("password-sign-in").value;

            signInWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    console.log("Sesión iniciada con correo electrónico:", cred.user);
                    window.location.href = '/'
                })
                .catch((err) => {
                    const errorMessage = err.code;

                    switch (errorMessage) {
                        case "auth/invalid-email":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">El correo electrónico no es válido</p>
                            `
                            emailAlert.appendChild(span)
                            console.log("El correo electrónico no es válido");
                            break;
                        case "auth/user-disabled":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">El usuario fue deshabilitado</p>
                            `
                            emailAlert.appendChild(span)
                            console.log("El usuario fue deshabilitado");
                            break;
                        case "auth/user-not-found":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">Usuario no encontrado</p>
                            `
                            emailAlert.appendChild(span)
                            console.log("Usuario no encontrado");
                            break;
                        case "auth/wrong-password":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">La contraseña no es correcta</p>
                            `
                            passwordAlert.appendChild(span)
                            console.log("La contraseña no es correcta");
                            break;
                        case "auth/invalid-credential":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">Usuario o contraseña incorrectos</p>
                            `
                            passwordAlert.appendChild(span)
                            console.log("Usuario o contraseña incorrectos");
                            break;
                        default:
                            console.error("Error:", errorMessage);
                    }
                });
        });
    }

    if (signOutButton) {
        signOutButton.addEventListener("click", (e) => {
            e.preventDefault();

            signOut(auth)
                .then(() => {
                    console.log("Sesión cerrada correctamente");
                })
                .catch((err) => {
                    console.log("Error al cerrar la sesión:", err);
                });
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                console.log("Usuario activo y verificado");
                updateUI(user);
            } else {
                console.warn("El correo no está verificado. Por favor, verifica tu correo");
            }
        } else {
            console.log("Usuario inactivo");
            updateUI(null);
        }
    });

    const updateUI = (user) => {
        if (user) {
            signOutButton.style.display = "inline-flex";
            signInButtonMain.style.display = "none";
            signUpButtonMain.style.display = "none";
            signUpButtonHero.style.display = "none";
        } else {
            signOutButton.style.display = "none";
            signInButtonMain.style.display = "inline-flex";
            signUpButtonMain.style.display = "inline-flex";
            signUpButtonHero.style.display = "inline-flex";
        }
    };
});
