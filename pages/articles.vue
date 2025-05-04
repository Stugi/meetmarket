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

    <div v-if="loading" class="text-center py-10">Загрузка статей...</div>
    <div v-else-if="error" class="text-center py-10 text-red-600">
      Произошла ошибка при загрузке данных: {{ error.message }}
    </div>
    <div
      v-else-if="filteredPosts.length === 0 && !searchQuery"
      class="text-center py-10 text-gray-600"
    >
      Статьи не найдены.
    </div>
    <div
      v-else-if="filteredPosts.length === 0 && searchQuery"
      class="text-center py-10 text-gray-600"
    >
      Статьи по запросу "{{ searchQuery }}" не найдены.
    </div>
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ArticleCard
        v-for="post in filteredPosts"
        :key="post.id"
        :article="post"
        :is-favorite="isFavorite(post.id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { ApolloError } from "@apollo/client/core";
import type { Post } from "~/types";

const router = useRouter();
const authStore = useAuthStore();
const searchQuery = ref("");
const favoritesStore = useFavoritesStore();

// Получаем данные, состояние загрузки и ошибку из composable useArticles
const { result: articlesResult, loading, error } = useArticles();

// Инициализируем хранилище избранного при монтировании
// Проверка аутентификации удалена, т.к. её делает middleware
onMounted(() => {
  favoritesStore.initializeFromLocalStorage();
});

// Вычисляемое свойство для фильтрации статей
const filteredPosts = computed((): Post[] => {
  const posts = articlesResult.value?.posts?.data ?? [];
  if (!searchQuery.value) {
    return posts;
  }
  // Фильтруем по названию без учета регистра
  return posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Методы для работы с избранным
const isFavorite = (id: string) => favoritesStore.isFavorite(id);

const toggleFavorite = (id: string) => {
  if (isFavorite(id)) {
    favoritesStore.removeFavorite(id);
  } else {
    favoritesStore.addFavorite(id);
  }
};
</script>
