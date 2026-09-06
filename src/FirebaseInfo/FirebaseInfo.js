import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    browserLocalPersistence,
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//     persistence: browserLocalPersistence
// });
export const auth = getAuth(app);