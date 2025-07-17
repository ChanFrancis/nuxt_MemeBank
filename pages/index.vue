<template>
    <div class="p-6 min-h-lvh pb-3">
        <div class="flex items-center justify-between mb-6">
            <h1 class="font-bold text-3xl">Memes</h1>
            <button class="btn btn-accent" @click="modalRef?.open()">
                <span> <PlusIcon class="w-6 h-6" /> </span>Poster un meme
            </button>
        </div>
        <div v-if="pending">Chargement...</div>
        <div v-else class="grid grid-cols-[repeat(auto-fit,_minmax(250px,180px))] gap-4 justify-center">
            <ImageBox v-for="(sticker, index) in displayedStickers" :key="index">
                <StickerCard :sticker="sticker" />
            </ImageBox>
            <!-- <MoreButton @click="handleAddMoreMemes" /> -->
        </div>
        <MemeRandom />
    </div>
    <Modal ref="modalRef" title="Poster un meme">
        <ImageUploader />
    </Modal>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { useStickerStore } from "@/stores/stickerStore"
import MoreButton from "~/components/More.vue"
import { PlusIcon } from "@heroicons/vue/24/solid"

import ImageUploader from "@/components/ImageUploader.vue"
import MemeRandom from "~/components/MemeRandom.vue"
import type { Sticker } from "~/types/sticker"
import { useSearchStore } from "~/stores/searchStore"

const storeStickers = useStickerStore()
const { stickers } = storeToRefs(storeStickers)

const searchStore = useSearchStore()
const { searchQuery, isSearch, searchedStickers } = storeToRefs(searchStore)

const modalRef = ref<{ open: () => void; close: () => void } | null>(null)
const pending = ref(true)
const displayedStickers = ref<Sticker[]>([])

// fetch stickers
onMounted(async () => {
    await storeStickers.fetchStickers()
    pending.value = false
    displayedStickers.value = stickers.value
})

watch(
    [searchQuery],
    () => {
        if (isSearch.value && searchQuery.value.length > 0) {
            displayedStickers.value = searchedStickers.value
            console.log("hey", searchQuery.value, isSearch.value, searchedStickers.value)
        } else {
            displayedStickers.value = stickers.value
            console.log("hey2", isSearch.value, searchedStickers.value)
        }
    },
    { immediate: true }
)

function handleAddMoreMemes() {
    const firstSticker = stickers.value.find((s) => s.id === 1)
    if (firstSticker) {
        displayedStickers.value = Array(5).fill(firstSticker)
    }
}
</script>
