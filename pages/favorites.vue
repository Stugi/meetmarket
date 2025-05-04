<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Избранное</h1>

    <ClientOnly>
      <div v-if="isReady" class="min-h-[60vh]">
        <div v-if="loading" class="text-center py-10">
          Загрузка избранного...
        </div>
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

      <!-- Fallback для ClientOnly -->
      <template #fallback>
        <div class="min-h-[60vh] text-center py-10">
          Проверка доступа... {/* Более подходящий текст */}
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types";

const router = useRouter(); // Добавляем router
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const { result, loading, error } = useArticles();

// Флаг, показывающий, что проверка аутентификации завершена
const isReady = ref(false);

// --- Проверка аутентификации при монтировании на клиенте ---
onMounted(() => {
  authStore.initialize();
  if (!authStore.isAuthenticated) {
    console.log("[favorites.vue] Not authenticated, redirecting to /login");
    router.push("/login");
  } else {
    console.log("[favorites.vue] Authenticated, proceeding.");
    favoritesStore.initializeFromLocalStorage(); // Инициализация избранного
    isReady.value = true; // Показываем контент
  }
});
// ----------------------------------------------------------

const favoritePosts = computed((): Post[] => {
  // Добавляем проверку isReady, чтобы не вычислять до проверки auth
  if (!isReady.value) return [];

  const allPosts = result.value?.posts?.data ?? [];
  if (!favoritesStore.favoriteIds.length || !allPosts.length) {
    return [];
  }
  const favoriteIdSet = new Set(favoritesStore.favoriteIds);
  return allPosts.filter((post: Post) => favoriteIdSet.has(post.id));
});

const removeFromFavorites = (id: string) => {
  favoritesStore.removeFavorite(id);
};
</script>
