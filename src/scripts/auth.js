import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => { 
    const provider = new GoogleAuthProvider()
    
    // GET BUTTONS
    const googleButton = document.getElementById('googleButton')
    const signInButton = document.getElementById('signInButton')
    const signUpButton = document.getElementById('signUpButton')
    const signOutButton = document.getElementById('signOutButton')
    
    // GET BUTTONS FOR HIDE
    const signInButtonMain = document.getElementById("signInButtonMain");
    const signUpButtonMain = document.getElementById("signUpButtonMain");
    const signUpButtonHero = document.getElementById("signUpButtonHero");
    
    // GOOGLE AUTH
    googleButton.addEventListener('click', e => {
        e.preventDefault()
    
        signInWithPopup(auth, provider)
        .then(result => {
            console.log('Sesión iniciada con Google', result.user)
            window.location.href = '/'
    
        }).catch(err => {
            console.log('Error al iniciar con Google: ', err)
        })
    })
    
    // EMAIL SIGN IN
    signInButton.addEventListener('click', e => {
        e.preventDefault()
    
        const email = document.getElementById('email-sign-in').value
        const password = document.getElementById('password-sign-in').value
    
        signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('Sesión iniciada con correo electrónico', cred.user)
        }).catch(err => {
            const errorMessage = err.code
    
            switch (errorMessage) {
                case 'auth/invalid-email':
                    console.log('El correo electrónico no es válido')
                    break
                case 'auth/user-disabled':
                    console.log('El usuario fue deshabilitado')
                    break
                case 'auth/user-not-found':
                    console.log('Usuario no encontrado')
                    break
                case 'auth/wrong-password':
                    console.log('La contraseña no es correcta')
                    break
                default:
                    console.error('Error: ', errorMessage)   
                
            }
        })
    })
    
    // EMAIL SIGN UP
    signUpButton.addEventListener('click', e => {
        e.preventDefault()
    
        const email = document.getElementById('email-sign-up').value
        const password = document.getElementById('password-sign-up').value
    
        createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('Usuario creado correctamente, se envió un correo de verificación', cred.user)
            return sendEmailVerification(auth.currentUser)
        }).catch(err => {
            const errorMessage = err.code
    
            switch (errorMessage) {
                case 'auth/email-already-in-use':
                    console.log('El correo electrónico ya está en uso')
                    break
                case 'auth/invalid-email':
                    console.log('El correo electrónico no es válido')
                    break
                case 'auth/weak-password':
                    console.log('La contraseña ingresada es débil')
                    break
                default:
                    console.error('Error: ', errorMessage)   
                
            }
        })
    })
    
    // SIGN OUT
    signOutButton.addEventListener('click', e => {
        e.preventDefault()
    
        signOut(auth)
        .then(() => {
            console.log('Sesión cerrada correctamente')
        }).catch(err => {
            console.log('Error al cerrar la sesión', err)
        })
    })
    
    // ACCOUNT STATE
    onAuthStateChanged(auth, user => {
        if (user) {
            if (user.emailVerified) {
                console.log('Usuario activo y verificado')
                updateUI(user)
                window.location.href = '/'
            } else {
                console.warn('El correo no está verificado. Por favor, verifica tu correo')
            }
        } else {
            console.log('Usuario inactivo')
        }
    })
    
    // UPDATE UI 
    const updateUI = user => {
        if (user) {
            signOutButton.style.display = 'inline-flex'
            signInButtonMain.style.display = 'none'
            signUpButtonMain.style.display = 'none'
            signUpButtonHero.style.display = 'none'
        } else {
            signOutButton.style.display = 'none'
            signInButtonMain.style.display = 'inline-flex'
            signUpButtonMain.style.display = 'inline-flex'
            signUpButtonHero.style.display = 'inline-flex'
        }
    }
})
