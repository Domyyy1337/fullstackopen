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
  url: string
}

export type Statistic = {
  name: string
  amount: number
}

export type RepositoriesResponse = {
  totalCount: number
  edges: RepositoryNode[]
  pageInfo: PageInfo
}

export type RepositoryResponse = {
  repository: Repository & {
    reviews: {
      edges: ReviewNode[]
    }
  }
}

export type ReviewNode = {
  node: Review
}

export type RepositoryNode = {
  node: Repository
  cursor: string
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage?: boolean
  startCursor: string
  endCursor: string
}

export const SignInSchema = z.object({
  username: z.string({ error: issue => (issue.input === undefined ? 'Username is required' : '') }),
  password: z.string({ error: issue => (issue.input === undefined ? 'Password is required' : '') }),
})
export type SignInType = z.infer<typeof SignInSchema>

export const NewReviewSchema = z.object({
  ownerUsername: z.string({ error: i => (i.input === undefined ? 'Username is required' : '') }),
  repositoryName: z.string({ error: i => (i.input === undefined ? 'Repository name is required' : '') }),
  rating: z.coerce.number().gte(0).lte(100),
  review: z.string().optional(),
})
export type NewReviewType = z.infer<typeof NewReviewSchema>

export type ReviewFormValues = Omit<NewReviewType, 'rating'> & {
  rating: string
}

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

export type Review = {
  id: string
  text: string
  rating: number
  createdAt: string
  user: User
}

export type User = {
  id: string
  username: string
}
