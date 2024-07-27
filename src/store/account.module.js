import {
  userService
} from '../services'
import router from '../router/index.js'

const user = JSON.parse(localStorage.getItem('user'))
// const user = $store.state.account.user
const state = user ? {
  status: {
    loggingIn: false,
    loggedIn: true
  },
  user
} : {
    status: {},
    user: null
  }

const actions = {
  async login ({
    commit
  }, {
    email,
    password
  }) {
    commit('loging', { email })
    try {
      const user = await userService.login(email, password)
      commit('loginSuccess', user)
      router.push('/')
    } catch (error) {
      commit('loginFailure', error)
      console.log('login error', error)
    }
  },
  logout ({
    commit
  }) {
    userService.logout()
    commit('logout')
  },
  register ({
    dispatch,
    commit
  }, user) {
    commit('registerRequest', user)

    userService.register(user)
      .then(
        user => {
          commit('registerSuccess', user)
          router.push('/login')
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', {
              root: true
            })
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, {
            root: true
          })
        }
      )
  }
}

const mutations = {
  // loging (state, user) {
  loging (state) {
    state.status = {
      loggingIn: true
    }
    // state.user = user
  },
  loginSuccess (state, user) {
    if (user) {
      state.status = {
        loggingIn: false,
        loggedIn: true
      }
      state.user = user

    }
  },
  loginFailure (state) {
    state.status = {
      loggingIn: false,
    }
    state.user = null
  },
  logout (state) {
    state.status = {}
    state.user = null
  },
  registerRequest (state) {
    state.status = {
      registering: true
    }
  },
  registerSuccess (state) {
    state.status = {}
  },
  registerFailure (state) {
    state.status = {}
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
