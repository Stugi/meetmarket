export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
    if (to.path !== '/login') {
      if (!authStore.isAuthenticated) {
        return navigateTo('/login')
      }
    }
  })