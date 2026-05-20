export type Repository = {
  id: string
  fullName: string
  description: string
  language: string
  forksCount: number
  stargazersCount: number
  ratingAverage: number
  reviewCount: number
  ownerAvatarUrl: string
}

export type Statistic = {
  name: string
  amount: number
}

export type RepositoryResponse = {
  totalCount: number
  edges: RepositoryNode[]
  pageInfo: PageInfo
}

export type RepositoryNode = {
  node: Repository
  cursor: string
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}
