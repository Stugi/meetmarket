<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Избранное</h1>
    <div v-if="!authStore.isAuthenticated" class="text-center py-10">
      <p class="text-gray-600 mb-4">
        Пожалуйста, войдите в систему, чтобы просмотреть избранное.
      </p>
      <NuxtLink
        to="/login"
        class="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
        >Войти</NuxtLink
      >
    </div>
    <div v-else>
      <div v-if="loading" class="text-center py-10">Загрузка избранного...</div>
      <div v-else-if="error" class="text-center py-10 text-red-600">
        Ошибка загрузки данных: {{ error.message }}
      </div>
      <div v-else-if="favoritePosts.length === 0" class="text-center py-10">
        <p class="text-gray-600 mb-4">У вас пока нет избранных статей.</p>
        <NuxtLink to="/articles" class="text-blue-500 hover:text-blue-700"
          >Перейти к статьям</NuxtLink
        >
      </div>
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard
          v-for="article in favoritePosts"
          :key="article.id"
          :article="article"
          :is-favorite="true"
          @toggle-favorite="removeFromFavorites"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();

const { result, loading, error } = useArticles();

onMounted(() => {
  favoritesStore.initializeFromLocalStorage();
  authStore.initialize();
});

const favoritePosts = computed((): Post[] => {
  const allPosts = result.value?.posts?.data ?? [];
  if (!favoritesStore.favoriteIds.length || !allPosts.length) {
    return [];
  }
  // Создаем Set из строковых ID для быстрой проверки
  const favoriteIdSet = new Set(favoritesStore.favoriteIds);
  return allPosts.filter((post: Post) => favoriteIdSet.has(post.id));
});

const removeFromFavorites = (id: string) => {
  favoritesStore.removeFavorite(id);
};
</script>
