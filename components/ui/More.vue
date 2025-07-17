<!-- add more stickers button -->
<template>
    <div class="flex flex-nowrap items-center justify-center w-auto ml-5">
        <button
            class="cursor-pointer hover:text-lg hover:font-semibold transition[font-size,font-weight] duration-[0.2s]"
            @click="onClick"
        >
            Add more
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    onClick: () => void
}>()
</script>
