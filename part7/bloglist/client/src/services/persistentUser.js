export function getUser() {
  const user = window.localStorage.getItem('savedBlogsUser')
  return user ? JSON.parse(user) : null
}

export function saveUser(user) {
  window.localStorage.setItem('savedBlogsUser', JSON.stringify(user))
}

export function removeUser() {
  window.localStorage.removeItem('savedBlogsUser')
}
