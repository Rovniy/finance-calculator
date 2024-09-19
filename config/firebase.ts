type OwnerType = {
    firestore: {
        collection: {
            transactions: string
        }
    },
    creds: {
        [key: string]: string
    }
}

export const firebase : OwnerType = {
    firestore: {
        collection: {
            transactions: 'transactions'
        }
    },
    creds: {
        FIREBASE_PROD_APIKEY: 'AIzaSyApTU_9C7WKnb_WtqkcFdwF7so6ciAH9L0',
        FIREBASE_AUTH_DOMAIN: 'finance-f299a.firebaseapp.com',
        FIREBASE_PROJECT_ID: 'finance-f299a',
        FIREBASE_APP_ID: '1:909281141235:web:2cea93bea02aa0f55b7286',
        FIREBASE_MESSAGING_SENDER_ID: '909281141235'
    }
}