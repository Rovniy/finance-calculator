import { config } from "./config"

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    app: {
        head: {
            title: 'XPLOIT Finance calculator',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {
                    name: 'description',
                    content: 'XPLOIT Finance calculator',
                },
            ],
            link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
        }
    },

    css: ['~/assets/sass/index.sass'],

    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },

    runtimeConfig: {
        app: {
            FIREBASE_PROD_APIKEY: config.firebase.creds.FIREBASE_PROD_APIKEY,
            FIREBASE_AUTH_DOMAIN: config.firebase.creds.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: config.firebase.creds.FIREBASE_PROJECT_ID,
            FIREBASE_APP_ID: config.firebase.creds.FIREBASE_APP_ID,
            FIREBASE_MESSAGING_SENDER_ID: config.firebase.creds.FIREBASE_MESSAGING_SENDER_ID,
        }
    },

    vite: {
        build: {
            sourcemap: true
        },
        clearScreen: true,
        logLevel: 'info',
    },

    modules: ['vuetify-nuxt-module', '@pinia/nuxt'],

    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: {
            shaking: true
        }
    },

    pinia: {
        storesDirs: ['./stores/**',],
    },

    buildModules: [
        '@nuxtjs/pwa',
    ],

    pwa: {
        meta: {
            mobileApp: true,
            mobileAppIOS: true,
            appleStatusBarStyle: 'black-translucent',
            name: 'XPLOIT Finance app',
            author: 'Andrei (Ravy) Rovnyi',
            lang: 'ru'
        },
        manifest: {
            name: 'XPLOIT Finance app',
            short_name: 'XPLOIT Finance app',
            lang: 'ru',
            useWebmanifestExtension: false
        }
    }
})