const dummy = blogs => {
  return 1
}

const totalLikes = blogs => blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)

const favoriteBlog = blogs =>
  blogs.length > 0
    ? blogs.reduce((previousValue, currentValue) =>
        currentValue && currentValue.likes >= previousValue.likes ? currentValue : previousValue,
      )
    : null

module.exports = { dummy, totalLikes, favoriteBlog }
