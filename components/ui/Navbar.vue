<!-- Navbar with logo and search button that will search memes thourght Humor API -->
<template>
    <nav class="w-full bg-secondary">
        <div class="container mx-auto max-w-6xl h-20 flex flex-nowrap justify-between items-center">
            <img src="/img/logo.png" alt="MemeBank" class="ml-5 w-40" />
            <div class="flex items-center gap-2">
                <input
                    v-if="isSearch"
                    v-model="searchQuery"
                    type="text"
                    class="input input-bordered w-64 ml-5"
                    placeholder="Rechercher un meme, un tag..."
                    @input="handleChange"
                />
                <button
                    class="hover:bg-white w-9 h-9 hover:w-10 hover:h-10 mr-5 rounded-full transition-[width,height,background-color] duration-[0.35s]"
                    @click="handleSearch"
                >
                    <img src="/img/search.png" alt="Search" class="cursor-pointer" />
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useSearchStore } from "~/stores/searchStore"

const searchStore = useSearchStore()
const { searchQuery, isSearch } = storeToRefs(searchStore)
const { handleSearch, handleChange } = searchStore
</script>
