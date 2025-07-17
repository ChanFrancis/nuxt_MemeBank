import { defineNuxtPlugin } from "#app"
import Vue3Toastify from "vue3-toastify"
import type { ToastContainerOptions } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

export default defineNuxtPlugin((nuxtApp) => {
    const options: ToastContainerOptions = {
        autoClose: 3000,
        theme: "colored",
    }

    nuxtApp.vueApp.use(Vue3Toastify, options)
})
