import { defineStore } from 'pinia'

interface Article {
  id: number
  title: string
  description: string
  content: string
}

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [] as Article[],
  }),

  actions: {
    async fetchArticles() {
      try {
        // Здесь должен быть реальный API запрос
        // Для демонстрации используем моковые данные
        this.articles = [
          {
            id: 1,
            title: 'Первая статья',
            description: 'Описание первой статьи',
            content: 'Содержание первой статьи'
          },
          {
            id: 2,
            title: 'Вторая статья',
            description: 'Описание второй статьи',
            content: 'Содержание второй статьи'
          }
        ]
      } catch (error) {
        console.error('Ошибка при загрузке статей:', error)
      }
    },

    getArticleById(id: number) {
      return this.articles.find(article => article.id === id)
    },

    getArticlesByIds(ids: number[]) {
      return this.articles.filter(article => ids.includes(article.id))
    }
  }
}) 