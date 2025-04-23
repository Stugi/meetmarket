<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по названию..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Произошла ошибка при загрузке данных</div>
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in filteredPosts"
        :key="post.id"
        class="bg-white p-6 rounded-lg shadow"
      >
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.body }}</p>
        <button
          @click="toggleFavorite(post.id)"
          :class="[
            'px-4 py-2 rounded',
            isFavorite(post.id)
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-indigo-500 hover:bg-indigo-600',
            'text-white',
          ]"
        >
          {{ isFavorite(post.id) ? "Удалить из избранного" : "В избранное" }}
        </button>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const favoritesStore = useFavoritesStore();

// Получаем данные через GraphQL
const { result, loading, error } = useArticles();

// Вычисляемое свойство для фильтрации статей
const filteredPosts = computed(() => {
  if (!result.value?.posts?.data) return [];

  return result.value.posts.data.filter((post: any) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Методы для работы с избранным
const isFavorite = (id: number) => favoritesStore.isFavorite(id);

const toggleFavorite = (id: number) => {
  if (isFavorite(id)) {
    favoritesStore.removeFavorite(id);
  } else {
    favoritesStore.addFavorite(id);
  }
};

onMounted(() => {
  favoritesStore.initializeFromLocalStorage();
});
</script>
