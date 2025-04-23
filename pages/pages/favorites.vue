<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Избранные статьи</h1>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Произошла ошибка при загрузке данных</div>
    <div v-else-if="favoriteArticles.length === 0" class="text-center py-8">
      <p class="text-gray-600">У вас пока нет избранных статей</p>
    </div>
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in favoriteArticles"
        :key="post.id"
        class="bg-white p-6 rounded-lg shadow"
      >
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.body }}</p>
        <button
          @click="favoritesStore.removeFavorite(post.id)"
          class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Удалить из избранного
        </button>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const favoritesStore = useFavoritesStore();
const { result, loading, error } = useArticles();

const favoriteArticles = computed(() => {
  if (!result.value?.posts.data) return [];

  return result.value.posts.data.filter((post) =>
    favoritesStore.isFavorite(post.id)
  );
});

onMounted(() => {
  favoritesStore.initializeFromLocalStorage();
});
</script>
