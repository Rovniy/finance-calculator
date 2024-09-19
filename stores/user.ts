import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null
    }),
    getters: {
        isUserLoggedIn: (state) => !!state.userData,
    },
    actions: {
        mwPageAuth() {
            if (!this.isUserLoggedIn) return useRouter().push('/')
        },
        setUserData(userData) {
            this.userData = userData
        },
        clearUserData() {
            this.userData = null
        }
    }
})