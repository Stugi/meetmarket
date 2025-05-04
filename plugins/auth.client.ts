export default defineNuxtPlugin(() => { // Убираем async, если он не нужен
    const favoritesStore = useFavoritesStore();
  
    // Инициализация избранного только на клиенте
    if (typeof localStorage !== 'undefined') {
      favoritesStore.initializeFromLocalStorage();
      console.log(`[CLIENT] Plugin: Favorites initialized, count: ${favoritesStore.favoriteIds.length}`);
    } else {
       console.log('[SERVER] Plugin: Skipping favorites initialization (no localStorage).');
    }
  });