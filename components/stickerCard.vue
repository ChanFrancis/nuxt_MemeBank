<!-- Card content, img, title and dynamic upvote -->
<template>
  <div
    class="flex items-center justify-center bg-primary flex-col m-[3px] shadow-md rounded-xl p-4 hover:scale-130 transition bg-gray"
  >
    <img
      :src="localSticker.url"
      :alt="localSticker.name"
      class="w-[250px] h-[200px] object-contain bg-white rounded"
    />
    <div
      class="w-full px-4 mt-2 font-semibold text-white flex flex-nowrap justify-between"
    >
      <p>{{ sticker.name }}</p>
      <p>
        <button class="text-red-600" @click="dislikeSticker">
          <img src="/img/downvote.png" alt="Upvote" class="w-4 h-4 pt-1 cursor-pointer " />
        </button>
        {{ localSticker?.likes ?? 0 }}
        <button @click="likeSticker">
          <img src="/img/upvote.png" alt="Upvote" class="w-4 h-4 pt-1 cursor-pointer " />
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sticker: Object,
});

const store = useStickerStore();
const localSticker = computed(() =>
  store.stickers.find((s) => s.id === props.sticker.id)
);

const likeSticker = () => {
  store.likeSticker(props.sticker.id);
};

const dislikeSticker = () => {
  store.dislikeSticker(props.sticker.id);
};
</script>
