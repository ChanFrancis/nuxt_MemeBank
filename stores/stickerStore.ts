// stores/stickers.ts
import { defineStore } from 'pinia'

export const useStickerStore = defineStore('stickers', {
  state: () => ({
    stickers: [] as Array<{
      id: number
      name: string
      url: string
      tags: string[]
      animated: boolean
      likes: number
    }>,
  }),

  actions: {
    async fetchStickers() {
      const res = await $fetch('/api/stickers')
      this.stickers = res
    },

    async likeSticker(id: number) {
      const res = await $fetch(`/api/stickers/${id}/like`, { method: 'POST' })
      const sticker = this.stickers.find(s => s.id === id)
      if (sticker) sticker.likes = res.likes
    },

    async dislikeSticker(id: number) {
      const res = await $fetch(`/api/stickers/${id}/dislike`, { method: 'POST' })
      const sticker = this.stickers.find(s => s.id === id)
      if (sticker) sticker.likes = res.likes
    },
  },
})
