const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogs => _.sumBy(blogs, blog => blog.likes)

const favoriteBlog = blogs => _.maxBy(blogs, blog => blog.likes)

const mostBlogs = blogs => {
  const group = _.groupBy(blogs, 'author')
  const authors = _.map(group, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }))

  return _.maxBy(authors, 'blogs')
}

const mostLikes = blogs => {
  const group = _.groupBy(blogs, 'author')
  const authors = _.map(group, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))
  console.log(authors)

  return _.maxBy(authors, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
