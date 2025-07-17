<!-- Card content, img, title and dynamic upvote -->
<template>
    <div
        class="flex items-center justify-center bg-primary flex-col shadow-md rounded-3xl p-5 hover:scale-105 transition bg-gray"
    >
        <img
            :src="localSticker.url"
            :alt="localSticker.name"
            class="w-[250px] h-[200px] object-contain bg-white rounded-xl"
        />
        <div class="w-full px-4 mt-2 font-semibold text-white flex flex-col justify-between gap-3">
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
            <ul class="flex gap-2">
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
</script>
