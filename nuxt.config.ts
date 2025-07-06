export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    runtimeConfig: {
        humorApiKey: process.env.HUMOR_API_KEY,
    },
    modules: [
        "@pinia/nuxt",
        "@nuxt/content",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/test-utils",
        "@nuxt/ui",
        '@pinia/nuxt',
    ],
    css: ["~/assets/css/main.css"],
    fonts: {
        families: [{ name: "Arimo", provider: "google" }],
    },
    ui: {
        primary: "blue",
        secondary: "green",
        ternary: "gray",
        color: {
            primary: '#061A40',
            secondary: '#31F9A9',
            ternary: '#93B5C6',
        }
    },
});
