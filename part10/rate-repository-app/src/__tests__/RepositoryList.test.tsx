import { render, screen } from '@testing-library/react-native'
import { RepositoryListContainer } from '../components/RepositoryList'
import { type RepositoriesResponse } from '../types'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories: RepositoriesResponse = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      render(<RepositoryListContainer repositories={repositories} />)

      const repositoryItems = screen.getAllByTestId('repositoryItem')

      expect(repositoryItems).toHaveLength(2)

      //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

      expect(firstRepositoryItem).toHaveTextContent(/TypeScript/)
      expect(secondRepositoryItem).toHaveTextContent(/JavaScript/)

      expect(firstRepositoryItem).toHaveTextContent(/88rating/i)
      expect(secondRepositoryItem).toHaveTextContent(/72rating/i)

      expect(firstRepositoryItem).toHaveTextContent(/3reviews/i)
      expect(secondRepositoryItem).toHaveTextContent(/3reviews/i)

      expect(firstRepositoryItem).toHaveTextContent(/1\.6kforks/i)
      expect(secondRepositoryItem).toHaveTextContent(/69forks/i)

      expect(firstRepositoryItem).toHaveTextContent(/21\.9kstars/i)
      expect(secondRepositoryItem).toHaveTextContent(/1\.8kstars/i)

      expect(firstRepositoryItem).toHaveTextContent(/jaredpalmer\/formik/i)
      expect(secondRepositoryItem).toHaveTextContent(/async-library\/react-async/i)

      expect(firstRepositoryItem).toHaveTextContent(/Build forms in React, without the tears/i)
      expect(secondRepositoryItem).toHaveTextContent(/Flexible promise-based React data loader/i)
    })
  })
})
