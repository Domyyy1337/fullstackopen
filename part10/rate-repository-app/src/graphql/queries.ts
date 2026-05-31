import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    createdAt
    url
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      ...RepositoryDetails
    }
  }

  ${REPOSITORY_DETAILS}
`

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }

  ${REPOSITORY_DETAILS}
`

export const GET_REPOSITORY = gql`
  query Repositories($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }

  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`

export const GET_USER_REVIEWS = gql`
  query Me {
    me {
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }

  ${REVIEW_DETAILS}
`
