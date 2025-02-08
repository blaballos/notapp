import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const requiredEnvVars = [
    'PUBLIC_API_KEY',
    'PUBLIC_AUTH_DOMAIN',
    'PUBLIC_PROJECT_ID',
    'PUBLIC_STORAGE_BUCKET',
    'PUBLIC_MESSAGING_SENDER_ID',
    'PUBLIC_APP_ID',
  ];
  
  requiredEnvVars.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`La variable de entorno ${key} no está definida.`);
    }
  });

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }