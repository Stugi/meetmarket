import { useQuery } from '@vue/apollo-composable'
import type { UseQueryReturn } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { Post } from '~/types';

  interface GetArticlesQuery {
      posts: {
       data: Post[];
      }
    }


const ARTICLES_QUERY = gql`
  query GetArticles {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`

export function useArticles(): UseQueryReturn<GetArticlesQuery, {}> {
  const queryResult = useQuery(ARTICLES_QUERY)

  return {
    ...queryResult,
  }
}