<!-- body of the page -->
<template>
  <div class="p-6 bg-ternary min-h-lvh pb-3">
    <h1 class="font-bold text-3xl">Memes</h1>
    <div v-if="pending">Chargement...</div>
    <div
      v-else
      class="grid grid-cols-[repeat(auto-fit,_minmax(250px,180px))] justify-center"
    >
      <ImageBox v-for="(s, index) in displayedStickers" :key="index">
        <StickerCard :sticker="s" />
      </ImageBox>
      <MoreButton @click="handleAddMoreMemes" />
    </div>
    <memeRandom />
  </div>
</template>

<script setup>
import { useStickerStore } from "@/stores/stickerStore";
import MoreButton from "~/components/more.vue";

const store = useStickerStore();
const stickers = computed(() => store.stickers);
const pending = ref(true);


const displayedStickers = ref([]);

onMounted(async () => {
  await store.fetchStickers();
  pending.value = false;

  displayedStickers.value = stickers.value;
});

function handleAddMoreMemes() {
    const firstSticker = stickers.value.find(s => s.id === 1);

    if (firstSticker) {
    displayedStickers.value = Array(5).fill(firstSticker);
    }

}
</script>
