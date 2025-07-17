// stores/stickers.ts
import { defineStore } from "pinia"
import type { Sticker } from "~/types/sticker"

export const useSearchStore = defineStore("search", () => {
    const searchQuery = ref("")
    const isSearch = ref(false)

    const searchedStickers = ref<Sticker[]>([])

    async function handleSearch() {
        isSearch.value = !isSearch.value
    }

    async function handleChange() {
        console.log("change")
        const res = await $fetch<Sticker[]>("/api/stickers").then((res) =>
            res.filter((sticker) => {
                return (
                    sticker.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    sticker.tags.some((tag) => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
                )
            })
        )
        searchedStickers.value = res
    }

    return {
        searchQuery,
        searchedStickers,
        isSearch,
        handleChange,
        handleSearch,
    }
})
