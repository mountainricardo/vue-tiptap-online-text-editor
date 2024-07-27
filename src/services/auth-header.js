export function authHeader () {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'))
  // const user = this.$store.state.account.user

  if (user && user.access_token) {
    // console.log('authHeader token', user.access_token)
    return {
      Authorization: 'Bearer ' + user.access_token
    }
  } else {
    return {}
  }
}
