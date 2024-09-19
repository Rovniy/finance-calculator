import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    let firebaseApp, firebaseAuth, firestoreDb

    const firebaseConfig = {
        apiKey: config.app.FIREBASE_PROD_APIKEY,
        authDomain: config.app.FIREBASE_AUTH_DOMAIN,
        projectId: config.app.FIREBASE_PROJECT_ID,
        messagingSenderId: config.app.FIREBASE_MESSAGING_SENDER_ID,
        appId: config.app.FIREBASE_APP_ID,
    }

    try {
        firebaseApp = initializeApp(firebaseConfig)
        firebaseAuth = getAuth(firebaseApp)
        firestoreDb = getFirestore(firebaseApp)

        return {
            provide: {
                firebaseApp,
                firebaseAuth,
                firestoreDb
            }
        }
    } catch (e) {
        console.error(e)
    }
})