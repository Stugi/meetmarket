import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteIds: [] as number[],
  }),

  actions: {
    initializeFromLocalStorage() {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        this.favoriteIds = JSON.parse(stored)
      }
    },

    addFavorite(id: number) {
      if (!this.favoriteIds.includes(id)) {
        this.favoriteIds.push(id)
        this.syncWithLocalStorage()
      }
    },

    removeFavorite(id: number) {
      const index = this.favoriteIds.indexOf(id)
      if (index > -1) {
        this.favoriteIds.splice(index, 1)
        this.syncWithLocalStorage()
      }
    },

    syncWithLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favoriteIds))
    },
  },

  getters: {
    isFavorite: (state) => (id: number) => state.favoriteIds.includes(id),
  },
})