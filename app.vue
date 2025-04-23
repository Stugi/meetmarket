<template>
  <div>
    <nav class="bg-gray-800 text-white p-4" v-if="authStore.isAuthenticated">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex space-x-4">
          <NuxtLink to="/articles" class="hover:text-gray-300">
            Статьи
          </NuxtLink>
          <NuxtLink to="/favorites" class="hover:text-gray-300">
            Избранное
          </NuxtLink>
        </div>
        <button
          @click="handleLogout"
          class="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
        >
          Выйти
        </button>
      </div>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

// Проверяем авторизацию при загрузке приложения
onMounted(() => {});
</script>
