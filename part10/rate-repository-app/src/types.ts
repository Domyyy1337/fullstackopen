import * as z from 'zod'

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

export const SignInSchema = z.object({
  username: z.string({ error: issue => (issue.input === undefined ? 'Username is required' : '') }),
  password: z.string({ error: issue => (issue.input === undefined ? 'Password is required' : '') }),
})
export type SignInType = z.infer<typeof SignInSchema>

export type AuthenticateInput = {
  credentials: {
    username: string
    password: string
  }
}

export type AuthenticateData = {
  authenticate: {
    accessToken: string
    expiresAt: string
  }
}

export type MeQuery = {
  me: Me | null
}

export type Me = {
  id: string
  username: string
}
