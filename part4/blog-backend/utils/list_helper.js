const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => _.sumBy(blogs, blog => blog.likes)

const favoriteBlog = blogs => _.maxBy(blogs, blog => blog.likes)

const mostBlogs = blogs => {
  const count = _.countBy(blogs, 'author')
  const max = _.max(Object.entries(count))
  return max
    ? {
        author: max[0],
        blogs: max[1],
      }
    : null
}

const mostLikes = blogs => 1

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
