<template>
  <article
    class="bg-white p-6 rounded-lg shadow transition-shadow duration-200 hover:shadow-md flex flex-col h-full"
  >
    <div class="flex-grow">
      <h2 class="text-xl font-bold mb-2">{{ article.title }}</h2>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ article.body }}</p>
    </div>

    <button
      @click="emitToggleFavorite"
      :class="[
        'px-4 py-2 rounded font-medium transition-colors duration-150 w-full text-left mt-auto',
        isFavorite
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-indigo-500 text-white hover:bg-indigo-600',
      ]"
    >
      {{ isFavorite ? "В избранном" : "В избранное" }}
      <span v-if="isFavorite" class="ml-1">❤️</span>
      <span v-else class="ml-1">🤍</span>
    </button>
  </article>
</template>

<script setup lang="ts">
import type { Post } from "~/types/article";

const props = defineProps<{
  article: Post;
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-favorite", id: string): void;
}>();

const emitToggleFavorite = () => {
  emit("toggle-favorite", props.article.id);
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 4.5em;
}
</style>
