<template>
    <div class="p-6 min-h-lvh pb-3">
        <div class="flex items-center justify-between mb-6">
            <h1 class="font-bold text-3xl">Memes</h1>
            <button class="btn btn-accent" @click="modalRef?.open()">
                <PlusIcon class="w-6 h-6" />
                <span>Poster un meme</span>
            </button>
        </div>
        <div v-if="pending">Chargement...</div>
        <div
            v-else
            class="grid grid-cols-[repeat(auto-fit,_minmax(250px,180px))] gap-4 justify-center mb-8 items-stretch"
        >
            <ImageBox v-for="(sticker, index) in displayedStickers" :key="index">
                <StickerCard :sticker="sticker" />
            </ImageBox>
        </div>
        <MemeRandom />
    </div>
    <Modal ref="modalRef" title="Poster un meme">
        <ImageUploader :modal-ref="modalRef" />
    </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useStickerStore } from "@/stores/stickerStore"
import MoreButton from "~/components/ui/More.vue"
import { PlusIcon } from "@heroicons/vue/24/solid"

import ImageUploader from "@/components/ImageUploader.vue"
import MemeRandom from "~/components/MemeRandom.vue"
import type { Sticker } from "~/types/sticker"
import { useSearchStore } from "~/stores/searchStore"
import Modal from "~/components/ui/Modal.vue"

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

// update displayed stickers based on search query
watch(
    [searchQuery, searchedStickers],
    (newSearchQuery) => {
        console.log("Search query changed:", newSearchQuery, searchedStickers.value)

        if (isSearch.value && newSearchQuery.length >= 0) {
            displayedStickers.value = searchedStickers.value
        } else {
            displayedStickers.value = stickers.value
        }
    },
    { immediate: true }
)

watch(
    () => storeStickers.stickers,
    (newStickers) => {
        displayedStickers.value = newStickers
    }
)
</script>
