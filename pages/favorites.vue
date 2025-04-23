<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Избранное</h1>
    <div v-if="!authStore.isAuthenticated" class="text-center">
      <p class="text-gray-600">
        Пожалуйста, войдите в систему, чтобы просмотреть избранное
      </p>
      <NuxtLink to="/login" class="text-blue-500 hover:text-blue-700"
        >Войти</NuxtLink
      >
    </div>
    <div v-else>
      <div v-if="favoritePosts.length === 0" class="text-center">
        <p class="text-gray-600">У вас пока нет избранных статей</p>
      </div>
      <div v-else class="grid gap-4">
        <div
          v-for="article in favoritePosts"
          :key="article.id"
          class="border rounded-lg p-4"
        >
          <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
          <p class="text-gray-600 mb-4">{{ article.description }}</p>
          <div class="flex justify-between items-center">
            <NuxtLink
              :to="`/articles/${article.id}`"
              class="text-blue-500 hover:text-blue-700"
            >
              Читать далее
            </NuxtLink>
            <button
              @click="removeFromFavorites(article.id)"
              class="text-red-500 hover:text-red-700"
            >
              Удалить из избранного
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const favoriteArticles = ref([]);
// Получаем данные через GraphQL
const { result, loading, error } = useArticles();

// Инициализация при загрузке страницы
onMounted(async () => {
  favoritesStore.initializeFromLocalStorage();
  favoriteArticles.value = result.value.posts.data;
});

const favoritePosts = computed(() => {
  return result.value.posts.data.filter((post: any) =>
    favoritesStore.favoriteIds.includes(post.id)
  );
});

const removeFromFavorites = (id: number) => {
  favoritesStore.removeFavorite(id);
  // Обновляем список статей после удаления
  favoriteArticles.value = favoriteArticles.value.filter(
    (article) => article.id !== id
  );
};
</script>
