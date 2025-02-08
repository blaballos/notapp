import { auth } from "./firebase";
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        googleButton: document.getElementById("googleButton"),
        signInButton: document.getElementById("signInButton"),
        signOutButton: document.getElementById("signOutButton"),
        signInButtonMain: document.getElementById("signInButtonMain"),
        signUpButtonMain: document.getElementById("signUpButtonMain"),
        signUpButtonHero: document.getElementById("signUpButtonHero"),
        emailAlert: document.getElementById("email-alert"),
        passwordAlert: document.getElementById("password-alert")
    };

    const showError = (element, message) => {
        const span = document.createElement("span");
        span.innerHTML = `<p class="text-red-500 font-medium text-xs mb-2">${message}</p>`;
        element.innerHTML = ""; // Limpiar alertas previas
        element.appendChild(span);
    };

    const errorMessages = {
        "auth/invalid-email": "El correo electrónico no es válido",
        "auth/user-disabled": "El usuario fue deshabilitado",
        "auth/user-not-found": "Usuario no encontrado",
        "auth/wrong-password": "La contraseña no es correcta",
        "auth/invalid-credential": "Usuario o contraseña incorrectos"
    };

    if (elements.googleButton) {
        elements.googleButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const result = await signInWithPopup(auth, provider);
                console.log("Sesión iniciada con Google:", result.user);
                window.location.href = "/";
            } catch (err) {
                console.log("Error al iniciar sesión con Google:", err);
            }
        });
    }

    if (elements.signInButton) {
        elements.signInButton.addEventListener("click", async (e) => {
            e.preventDefault();
            
            const email = document.getElementById("email-sign-in").value;
            const password = document.getElementById("password-sign-in").value;

            try {
                const cred = await signInWithEmailAndPassword(auth, email, password);
                console.log("Sesión iniciada con correo electrónico:", cred.user);
                window.location.href = "/";
            } catch (err) {
                console.error("Error:", err.code);
                if (errorMessages[err.code]) {
                    showError(
                        err.code.includes("password") ? elements.passwordAlert : elements.emailAlert,
                        errorMessages[err.code]
                    );
                }
            }
        });
    }

    if (elements.signOutButton) {
        elements.signOutButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                console.log("Sesión cerrada correctamente");
            } catch (err) {
                console.log("Error al cerrar la sesión:", err);
            }
        });
    }

    const updateUI = (user) => {
        const isAuthenticated = !!user;
        elements.signOutButton.style.display = isAuthenticated ? "inline-flex" : "none";
        elements.signInButtonMain.style.display = isAuthenticated ? "none" : "inline-flex";
        elements.signUpButtonMain.style.display = isAuthenticated ? "none" : "inline-flex";
        elements.signUpButtonHero.style.display = isAuthenticated ? "none" : "inline-flex";
    };

    onAuthStateChanged(auth, (user) => {
        console.log(user ? "Usuario activo y verificado" : "Usuario inactivo");
        updateUI(user);
    });
});
