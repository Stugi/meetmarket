import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    isInitialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    initialize() {
      if (typeof localStorage === 'undefined' || this.isInitialized) return;

      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
      }
      this.isInitialized = true;
    },

    login(email: string) {
      this.token = `fake_token_${email}_${Date.now()}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', this.token);
      }
    },

    logout() {
      this.token = null;
    
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
})