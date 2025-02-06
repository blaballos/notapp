import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton");
    const emailAlert = document.getElementById('email-alert')
    const passwordAlert = document.getElementById('password-alert')
    const span = document.createElement('span')

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
                    alert("Correo de verificación enviado. Verifica tu correo e inicia sesión");
                })
                .catch((err) => {
                    const errorMessage = err.code;

                    switch (errorMessage) {
                        case "auth/email-already-in-use":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">El correo electrónico ya está en uso</p>
                            `
                            emailAlert.appendChild(span)
                            console.log("El correo electrónico ya está en uso");
                            break;
                        case "auth/invalid-email":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">El correo electrónico no es válido</p>
                            `
                            emailAlert.appendChild(span)
                            console.log("El correo electrónico no es válido");
                            break;
                        case "auth/weak-password":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">La contraseña ingresada es débil</p>
                            `
                            passwordAlert.appendChild(span)
                            console.log("La contraseña ingresada es débil");
                            break;
                        case "auth/missing-password":
                            span.innerHTML = `
                            <p class="text-red-500 font-medium text-xs mb-2">Por favor, ingrese una contraseña</p>
                            `
                            passwordAlert.appendChild(span)
                            console.log("Por favor, ingrese una contraseña");
                            break;
                        default:
                            console.error("Error:", errorMessage);
                    }
                });
        });
    } else {
        console.error('El botón "Registrarse" no se encuentra en el DOM.');
    }

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