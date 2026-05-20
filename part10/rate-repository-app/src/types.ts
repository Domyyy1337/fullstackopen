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
}

export type RepositoryNode = {
  node: Repository
}
