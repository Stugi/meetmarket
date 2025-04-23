import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export const POSTS_QUERY = gql`
  query GetPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`

export function useArticles(options = {}) {
  return useQuery(POSTS_QUERY, { options })
}