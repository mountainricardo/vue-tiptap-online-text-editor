import axios from 'axios'
import {
  authHeader
} from '../services/'
import { api } from '@/config'

export const userService = {
  login,
  logout,
  register,
  // getAll,
  // getById,
  // update,
  delete: _delete
}

async function login (email, password) {
  const requestOptions = {
    method: 'post',
    url: `${ api.apiUrl + api.user.login }`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      email,
      password
    })
  }
  try {
    const response = await axios.request(requestOptions)

    const user = response.data
    if (user.access_token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      return response.data
    }
  } catch (error) {
    console.log('login error', error)
  }
}

async function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    console.log('text', text)
    console.log('handleResponse return data text && JSON.parse(text)', data)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function register (user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  // return fetch(`${api.apiUrl}/users/register`, requestOptions).then(handleResponse)
  return fetch(`${ api.apiUrl + api.user.users }`, requestOptions).then(handleResponse)
}

// function getAll () {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   }

//   return fetch(`${ api.apiUrl + api.user.users }`, requestOptions).then(handleResponse)
// }

// function getById (id) {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   }

//   return fetch(`${ api.apiUrl + api.user.users + id }/`, requestOptions).then(handleResponse)
// }

// function update (user) {
//   const requestOptions = {
//     method: 'PUT',
//     headers: {
//       ...authHeader(),
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   }

//   return fetch(`${ api.apiUrl + api.user.users + user.id }/`, requestOptions).then(handleResponse)
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${ api.apiUrl + api.user.users + id }/`, requestOptions).then(handleResponse)
}
