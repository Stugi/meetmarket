<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Строка поиска -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по названию..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <!-- Оборачиваем в ClientOnly -->
    <ClientOnly>
      <div class="min-h-[60vh]">
        <!-- Состояния загрузки/ошибки -->
        <div v-if="loading" class="text-center py-10">Загрузка статей...</div>
        <div v-else-if="error" class="text-center py-10 text-red-600">
          Произошла ошибка при загрузке данных: {{ error.message }}
        </div>
        <!-- Контент -->
        <div v-else>
          <div
            v-if="filteredPosts.length > 0"
            class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <ArticleCard
              v-for="post in filteredPosts"
              :key="post.id"
              :article="post"
              :is-favorite="isFavorite(post.id)"
              @toggle-favorite="toggleFavorite"
            />
          </div>
          <div v-else class="text-center py-10 text-gray-600">
            <span v-if="searchQuery"
              >Статьи по запросу "{{ searchQuery }}" не найдены.</span
            >
            <span v-else>Статьи не найдены.</span>
          </div>
        </div>
      </div>
      <!-- Fallback для ClientOnly -->
      <template #fallback>
        <div class="min-h-[60vh] text-center py-10">
          Загрузка содержимого...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types";

// Определяем meta для страницы (не обязательно, но полезно)
definePageMeta({});

const router = useRouter();
const authStore = useAuthStore();
const searchQuery = ref("");
const favoritesStore = useFavoritesStore();

// Получаем данные
const { result: articlesResult, loading, error } = useArticles();

// --- Проверка аутентификации при монтировании на клиенте ---
onMounted(() => {
  authStore.initialize();
  if (!authStore.isAuthenticated) {
    console.log("[articles.vue] Not authenticated, redirecting to /login");
    router.push("/login");
  } else {
    console.log("[articles.vue] Authenticated, proceeding.");
    favoritesStore.initializeFromLocalStorage();
  }
});

const filteredPosts = computed((): Post[] => {
  const posts = articlesResult.value?.posts?.data ?? [];
  if (!searchQuery.value) {
    return posts;
  }
  return posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const isFavorite = (id: string) => favoritesStore.isFavorite(id);

const toggleFavorite = (id: string) => {
  if (isFavorite(id)) {
    favoritesStore.removeFavorite(id);
  } else {
    favoritesStore.addFavorite(id);
  }
};
</script>
