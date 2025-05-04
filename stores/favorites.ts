import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteIds: [] as string[],
  }),
    actions: {
      initializeFromLocalStorage() {
        // Проверяем, что код выполняется в браузере
        if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem('favorites')
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              // Убедимся, что загруженные ID являются строками
              if (Array.isArray(parsed)) {
                this.favoriteIds = parsed.map(String);
              }
            } catch (e) {
              console.error("Ошибка парсинга избранного из localStorage:", e);
              this.favoriteIds = []; // Сброс в случае ошибки
              localStorage.removeItem('favorites');
            }
          }
        }
      },

      addFavorite(id: number | string) {
        const idStr = String(id);
        if (!this.favoriteIds.includes(idStr)) {
          this.favoriteIds.push(idStr)
          this.syncWithLocalStorage()
        }
      },

      removeFavorite(id: number | string) {
        const idStr = String(id);
        const index = this.favoriteIds.indexOf(idStr)
        if (index > -1) {
          this.favoriteIds.splice(index, 1)
          this.syncWithLocalStorage()
        }
      },
      syncWithLocalStorage() {
        // Проверяем, что код выполняется в браузере
        if (typeof localStorage !== 'undefined') {
         localStorage.setItem('favorites', JSON.stringify(this.favoriteIds))
        }
     },
   },

  getters: {
    isFavorite: (state) => (id: number | string) => state.favoriteIds.includes(String(id)),
  },
})