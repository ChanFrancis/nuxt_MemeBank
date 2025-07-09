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

  <section class="p-6">
    <h2 class="font-bold text-2xl mb-4">Poster un meme</h2>
    <ImageUploader />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStickerStore } from '@/stores/stickerStore';
import MoreButton from '~/components/more.vue';

import ImageUploader from '@/components/ImageUploader.vue';

// stickers
const store = useStickerStore();
const stickers = computed(() => store.stickers);
const pending = ref(true);
const displayedStickers = ref([]);

// fetch stickers
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
