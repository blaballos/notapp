import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton");

    if (signUpButton) {
        signUpButton.addEventListener("click", (e) => {
            e.preventDefault();

            const email = document.getElementById("email-sign-up").value;
            const password = document.getElementById("password-sign-up").value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    console.log("Usuario creado correctamente:", cred.user);
                    return sendEmailVerification(auth.currentUser);
                })
                .then(() => {
                    console.log("Correo de verificación enviado.");
                })
                .catch((err) => {
                    const errorMessage = err.code;

                    switch (errorMessage) {
                        case "auth/email-already-in-use":
                            console.log("El correo electrónico ya está en uso");
                            break;
                        case "auth/invalid-email":
                            console.log("El correo electrónico no es válido");
                            break;
                        case "auth/weak-password":
                            console.log("La contraseña ingresada es débil");
                            break;
                        default:
                            console.error("Error:", errorMessage);
                    }
                });
        });
    } else {
        console.error('El botón "Registrarse" no se encuentra en el DOM.');
    }

        // Actualización del estado del usuario
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    window.location.href = '/login'
                } else {
                    console.warn("El correo no está verificado. Por favor, verifica tu correo");
                }
            } else {
                console.log("Usuario inactivo");
            }
        });
});