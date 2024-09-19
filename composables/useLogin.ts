import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, onAuthStateChanged } from "firebase/auth"
import { useUserStore } from "~/stores/user";
import { config } from "~/config";

export default function () {
    return {
        init: async () => {
            return new Promise((resolve, reject) => {
                const auth = getAuth()
                const userStore = useUserStore()

                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        if (!config.owner.availableEmails.includes(user.email)) return reject('User not found')

                        userStore.setUserData(user)

                        resolve(user)
                    } else {
                        userStore.clearUserData()

                        reject('User not found')
                    }
                })
            })
        },
        google: async () => {
            try {
                const auth = getAuth();

                const provider = new GoogleAuthProvider()

                return signInWithPopup(auth, provider)
            } catch (e) {
                console.error('Can\'t auth user by Google', e);
            }
        }
    }
}