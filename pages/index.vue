<template>
  <div>
    <!-- Пустой шаблон, так как страница будет перенаправлять -->
  </div>
</template>

<script setup lang="ts">
// При загрузке страницы выполняем редирект
onMounted(() => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    navigateTo("/articles");
  } else {
    navigateTo("/login");
  }
});
</script>
