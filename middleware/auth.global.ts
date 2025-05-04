export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  authStore.initialize();

  const isAuthenticated = authStore.isAuthenticated;
  const isLoginPage = to.path === '/login';

    if (!isAuthenticated && !isLoginPage) {
      console.log('Auth Middleware: Not authenticated, redirecting to login');
      return navigateTo('/login');
    }

    if (isAuthenticated && isLoginPage) {
      console.log('Auth Middleware: Authenticated, redirecting from login to articles');
      return navigateTo('/articles');
    }
});
