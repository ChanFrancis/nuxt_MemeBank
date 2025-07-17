<!-- Card content, img, title and dynamic upvote -->
<template>
    <div
        class="flex items-center justify-center bg-primary flex-col shadow-md rounded-3xl p-5 hover:scale-105 transition bg-gray group"
    >
        <img
            :src="localSticker.url"
            :alt="localSticker.name"
            class="w-[250px] h-[200px] bg-white rounded-xl aspect-square object-cover"
        />
        <div class="w-full mt-2 font-semibold text-white flex flex-col justify-between gap-3">
            <button
                class="btn btn-sm btn-secondary group-hover:opacity-100 absolute top-2 right-2 opacity-0"
                @click="handleCopyToClipboard(localSticker.url)"
            >
                <ClipboardDocumentListIcon class="w-6 h-6" />
            </button>
            <div class="flex flex-nowrap items-center justify-between">
                <h3>{{ localSticker.name }}</h3>
                <p>
                    <button class="text-red-600" @click="dislikeSticker">
                        <img src="/img/downvote.png" alt="Upvote" class="w-4 h-4 pt-1 cursor-pointer" />
                    </button>
                    {{ localSticker?.likes ?? 0 }}
                    <button @click="likeSticker">
                        <img src="/img/upvote.png" alt="Upvote" class="w-4 h-4 pt-1 cursor-pointer" />
                    </button>
                </p>
            </div>
            <ul class="flex gap-2 flex-wrap">
                <li v-for="tag in localSticker.tags" :key="tag">
                    <span class="badge badge-accent badge-sm p-2.5">
                        {{ tag }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ClipboardDocumentListIcon } from "@heroicons/vue/24/outline"
import { toast } from "vue3-toastify"

const props = defineProps({
    sticker: Object,
})

const store = useStickerStore()
const localSticker = computed(() => store.stickers.find((s) => s.id === props.sticker.id))

const likeSticker = () => {
    store.likeSticker(props.sticker.id)
}

const dislikeSticker = () => {
    store.dislikeSticker(props.sticker.id)
}

const handleCopyToClipboard = (url) => {
    // need base url
    navigator.clipboard
        .writeText(`${window.location.origin}${url}`)
        .then(() => {
            toast.success("Le meme a été copié dans votre presse-papier !")
        })
        .catch((err) => {
            console.error("Failed to copy: ", err)
        })
}
</script>
