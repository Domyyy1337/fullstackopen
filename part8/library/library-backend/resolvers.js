const Author = require('./models/author')
const Book = require('./models/book')
const { GraphQLError } = require('graphql/error')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const books = await Book.find({
        ...(genre && { genres: genre }),
      })

      return books
    },
    allAuthors: async () => await Author.find({}),
  },
  Book: {
    author: book => book.author,
  },
  Author: {
    bookCount: author => Book.collection.countDocuments({ author: author._id }),
  },
  Mutation: {
    addBook: async (root, args) => {
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

      await book.save().catch(error => {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', error },
        })
      })

      await author.save().catch(error => {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', error },
        })
      })

      return book.populate('author')
    },
    editAuthor: async (root, { name, setBornTo }) => {
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
  },
}

module.exports = resolvers
