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

    async function handleChange(event: Event) {
        console.log("change")
        const target = event.target as HTMLInputElement
        const inputValue = target?.value || ""

        const res = await $fetch<Sticker[]>("/api/stickers").then((res) =>
            res.filter((sticker) => {
                return (
                    console.log("searching for:", inputValue, sticker.name),
                    sticker.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                        sticker.tags.some((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()))
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
