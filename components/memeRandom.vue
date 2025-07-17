<!-- interface of the API call of Humor API, this will render some random humor memes -->
<!-- Humor API Free have a daily limit of request -->
<script setup>
import { ArrowPathIcon } from "@heroicons/vue/24/solid"
import { ref, onMounted } from "vue"

const meme = ref(null)
const loading = ref(false)
const error = ref(null)

const loadMeme = async () => {
    loading.value = true
    error.value = null
    try {
        meme.value = await $fetch("/api/meme")
    } catch (err) {
        error.value = "Erreur lors du chargement du meme."
        console.error(err)
    } finally {
        loading.value = false
    }
}

const decodeText = (text) => {
    try {
        return decodeURIComponent(escape(text))
    } catch {
        return text
    }
}

onMounted(loadMeme)
</script>

<template>
    <div class="p-4 max-w-lg mx-auto text-center mb-4">
        <h2 class="text-xl font-bold mb-4">Meme aléatoire</h2>
        <button class="btn btn-accent" @click="loadMeme"><ArrowPathIcon class="w-6 h-6" /> Rafraîchir</button>

        <div v-if="loading" class="mt-4 text-gray-500">Chargement...</div>
        <div v-else-if="error" class="mt-4 text-red-500">{{ error }}</div>
        <div class="grid w-full">
            <div v-if="meme && meme.url" class="mt-6 w-lg">
                <p class="text-gray-600 italic mb-2">{{ decodeText(meme.description) }}</p>
                <img :src="meme.url" :alt="meme.description" class="mx-auto max-w-full rounded shadow" />
            </div>
        </div>
    </div>
</template>
