<template>
    <div>
        <form @submit.prevent="upload(tags, modalRef || null)" @keydown.enter.prevent>
            <input
                class="file-input file-input-bordered file-input-primary w-full mb-4"
                type="file"
                accept="image/*"
                @change="onFileChange"
            />
            <figure v-if="preview" class="mb-4">
                <img
                    :src="preview"
                    alt="Aperçu"
                    class="rounded-lg border border-base-content/20 w-full h-40 object-contain bg-white"
                />
            </figure>
            <div class="flex gap-2">
                <input
                    v-model="tagInput"
                    type="text"
                    placeholder="Tag (ex: troll, chat, politique,  etc.)"
                    class="input input-bordered w-full mb-4"
                    @keyup.enter.prevent="addTag"
                />
                <button type="button" class="btn btn-primary" @click="addTag">Ajouter un tag</button>
            </div>
            <div class="flex flex-wrap gap-1">
                <span v-for="(tag, index) in tags" :key="index" class="badge badge-accent flex items-between px-3">
                    {{ tag }}
                    <button type="button" class="btn btn-xs btn-ghost -mr-3.5" @click="removeTag(index)">x</button>
                </span>
            </div>
            <button type="submit" class="btn btn-accent w-full mt-6" :disabled="loading || !file">
                <span v-if="loading"> Uploading… ({{ progress }}%) </span>
                <span v-else> Upload </span>
            </button>
        </form>
        <div v-if="uploadedUrl" class="alert alert-success mt-4 p-2 text-sm">
            Meme enregistré : <a :href="uploadedUrl" target="_blank" class="link link-primary">{{ uploadedUrl }}</a>
        </div>
        <div v-if="error" class="alert alert-error mt-4 p-2 text-sm">Erreur : {{ error.message }}</div>
    </div>
</template>

<script lang="ts" setup>
import { useImageUploader } from "@/composables/useImageUploader"

const props = defineProps<{
    modalRef?: { open: () => void; close: () => void } | null
}>()

const tagInput = ref("")
const tags = ref<string[]>([])

const addTag = () => {
    if (tagInput.value.trim()) {
        tags.value.push(tagInput.value.trim())
        tagInput.value = ""
    }
}
const removeTag = (index: number) => {
    tags.value.splice(index, 1)
}

const { file, preview, uploadedUrl, progress, loading, error, success, onFileChange, upload } = useImageUploader()
</script>
