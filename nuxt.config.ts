import { config } from "./config"

const sw = process.env.SW === 'true'

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

    modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@vite-pwa/nuxt'],

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

    pwa: {
        strategies: 'generateSW',
        srcDir: undefined,
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        manifest: {
            name: 'XPLOIT Finance app',
            short_name: 'XploitFinanceApp',
            theme_color: '#ffffff',
            icons: [
                {
                    src: '/static/icon.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
        injectManifest: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
        client: {
            installPrompt: true,
            periodicSyncForUpdates: 20,
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            navigateFallback: '/',
            navigateFallbackAllowlist: [/^\/$/],
            type: 'module',
        },
    },
})