<template>
    <div>
        <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="file-input file-input-bordered file-input-primary w-full mb-4"
        />
        <figure v-if="preview" class="mb-4">
            <img
                :src="preview"
                alt="Aperçu"
                class="rounded-lg border border-base-content/20 w-full h-40 object-contain bg-white"
            />
        </figure>

        <button class="btn btn-accent w-full" @click="upload" :disabled="loading || !file">
            <span v-if="loading"> Uploading… ({{ progress }}%) </span>
            <span v-else> Upload </span>
        </button>
        <div v-if="uploadedUrl" class="alert alert-success mt-4 p-2 text-sm">
            Enregistré : <a :href="uploadedUrl" target="_blank" class="link link-primary">{{ uploadedUrl }}</a>
        </div>
        <div v-if="error" class="alert alert-error mt-4 p-2 text-sm">Erreur : {{ error.message }}</div>

        <div v-if="success && !error" class="alert alert-success mt-4 p-2 text-sm">Meme upload !</div>
    </div>
</template>

<script lang="ts" setup>
import { useImageUploader } from "@/composables/useImageUploader"

const { file, preview, uploadedUrl, progress, loading, error, success, onFileChange, upload } = useImageUploader()
</script>
