const Author = require('./models/author')
const Book = require('./models/book')
const { GraphQLError } = require('graphql/error')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { signToken } = require('./utils/jwt')

async function userExists(username) {
  return await User.exists({ username })
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const books = await Book.find({
        ...(genre && { genres: genre }),
      }).populate('author')

      return books
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => await Book.collection.distinct('genres'),
    me: async (root, args, { currentUser }) => currentUser,
  },
  Book: {
    author: ({ author }) => ({ name: author.name, born: author.born, id: author._id }),
  },
  Author: {
    bookCount: author => Book.collection.countDocuments({ author: author._id }),
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new GraphQLError('not authenticated', { extensions: { code: 'UNAUTHENTICATED' } })

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
      }

      const bookExists = await Book.exists({ ...args, author: author._id })

      if (bookExists)
        throw new GraphQLError(`This book already exists`, {
          extensions: { code: 'BAD_USER_INPUT' },
        })

      const book = new Book({ ...args, author: author._id })

      await author.save().catch(error => {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', error },
        })
      })

      await book.save().catch(error => {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', error },
        })
      })

      return book.populate('author')
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) throw new GraphQLError('not authenticated', { extensions: { code: 'UNAUTHENTICATED' } })

      const author = await Author.findOne({ name })
      if (!author) return null

      author.born = setBornTo

      await author.save().catch(error => {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', error, invalidArgs: setBornTo },
        })
      })

      return author
    },
    createUser: async (root, args) => {
      if (await userExists(args.username))
        throw new GraphQLError(`User with this username already exists`, {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username },
        })

      const user = new User({ ...args })

      await user.save()

      return user
    },
    login: async (root, { username, password }) => {
      if (!userExists(username) || password !== 'secret')
        throw new GraphQLError(`invalid credentials`, {
          extensions: { code: 'BAD_USER_INPUT' },
        })

      const user = await User.findOne({ username })

      return { value: signToken(user) }
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') throw new GraphQLError('_resetDatabase is only available in test mode')

      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },
  },
}

module.exports = resolvers
