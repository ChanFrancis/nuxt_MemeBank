// stores/stickers.ts
import { defineStore } from "pinia"
import type { Sticker } from "~/types/sticker"

export const useStickerStore = defineStore("stickers", () => {
    const stickers = ref<Sticker[]>([])

    async function fetchStickers() {
        const res = await $fetch<Sticker[]>("/api/stickers")
        stickers.value = res
    }

    async function likeSticker(id: number) {
        const res = await $fetch<Sticker>(`/api/stickers/${id}/like`, { method: "POST" })
        const sticker = stickers.value.find((s) => s.id === id)
        if (sticker) sticker.likes = res.likes
    }

    async function dislikeSticker(id: number) {
        const res = await $fetch<Sticker>(`/api/stickers/${id}/dislike`, { method: "POST" })
        const sticker = stickers.value.find((s) => s.id === id)
        if (sticker) sticker.likes = res.likes
    }

    return {
        stickers,
        fetchStickers,
        likeSticker,
        dislikeSticker,
    }
})
