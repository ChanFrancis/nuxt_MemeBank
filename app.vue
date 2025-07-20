<template>
    <Navbar />
    <div class="bg-ternary">
        <div class="container mx-auto max-w-6xl">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from "./components/ui/Navbar.vue"
import Vue3Toastify from "vue3-toastify"
import type { ToastContainerOptions } from "vue3-toastify"

onMounted(() => {
    const nuxtApp = useNuxtApp()
    nuxtApp.vueApp.use(Vue3Toastify, {
        autoClose: 3000,
        theme: "colored",
    } as ToastContainerOptions)
})
</script>
