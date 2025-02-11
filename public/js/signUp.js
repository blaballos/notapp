import { auth } from "./firebase";
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    onAuthStateChanged 
} from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton");
    const emailAlert = document.getElementById("email-alert");
    const passwordAlert = document.getElementById("password-alert");
    
    if (!signUpButton) {
        console.error('El botón "Registrarse" no se encuentra en el DOM.');
        return;
    }

    signUpButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-sign-up").value;
        const password = document.getElementById("password-sign-up").value;

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado correctamente:", cred.user);
            await sendEmailVerification(auth.currentUser);
            alert("Correo de verificación enviado. Verifica tu correo e inicia sesión");
        } catch (err) {
            handleAuthError(err.code, emailAlert, passwordAlert);
        }
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                window.location.href = "/login";
            } else {
                console.warn("El correo no está verificado. Por favor, verifica tu correo");
            }
        } else {
            console.log("Usuario inactivo");
        }
    });
});

function handleAuthError(errorCode, emailAlert, passwordAlert) {
    const errors = {
        "auth/email-already-in-use": "El correo electrónico ya está en uso",
        "auth/invalid-email": "El correo electrónico no es válido",
        "auth/weak-password": "La contraseña ingresada es débil",
        "auth/missing-password": "Por favor, ingrese una contraseña"
    };
    
    const alertElement = (errorCode.includes("password")) ? passwordAlert : emailAlert;
    
    if (errors[errorCode]) {
        const span = document.createElement("span");
        span.innerHTML = `<p class="text-red-500 font-medium text-xs mb-2">${errors[errorCode]}</p>`;
        alertElement.appendChild(span);
        console.log(errors[errorCode]);
    } else {
        console.error("Error desconocido:", errorCode);
    }
}
