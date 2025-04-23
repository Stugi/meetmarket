// pages/login.vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Вход в систему
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            :class="[
              'mt-1 block w-full rounded-md shadow-sm',
              emailError ? 'border-red-500' : 'border-gray-300',
              'focus:border-indigo-500 focus:ring-indigo-500',
            ]"
          />
          <p v-if="emailError" class="mt-1 text-sm text-red-600">
            {{ emailError }}
          </p>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ isLoading ? "Вход..." : "Войти" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const emailError = ref("");
const isLoading = ref(false);

// Проверяем авторизацию при загрузке страницы
onMounted(() => {
  authStore.initialize();
  if (authStore.isAuthenticated) {
    router.push("/articles");
  }
});

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleLogin = async () => {
  emailError.value = "";

  if (!email.value) {
    emailError.value = "Email обязателен";
    return;
  }

  if (!validateEmail(email.value)) {
    emailError.value = "Введите корректный email";
    return;
  }

  try {
    isLoading.value = true;
    // Фейковый логин
    await new Promise((resolve) => setTimeout(resolve, 500));
    authStore.login(email.value);
    router.push("/articles");
  } catch (error) {
    emailError.value = "Произошла ошибка при входе";
  } finally {
    isLoading.value = false;
  }
};
</script>
