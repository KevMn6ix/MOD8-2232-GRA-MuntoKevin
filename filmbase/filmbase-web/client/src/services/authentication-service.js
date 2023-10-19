import { ref, readonly, computed } from 'vue'
import axios from 'axios'
import router from '../router/index.js'
import validator from '../validators/authentication-validator.js'

const permissions = Object.freeze({
  filmsWrite: 'films-write',
  reviewsWrite: 'reviews-write',
  reviewsAdmin: 'reviews-admin'
})

const authenticatedUser = ref(null)
const readonlyAuthenticatedUser = readonly(authenticatedUser)
const userIsAuthenticated = computed(() => authenticatedUser.value !== null)

const userCanEditFilms = computed(() => userHasPermission(authenticatedUser.value, permissions.filmsWrite))

const userCanEditReviews = computed(() => {
  return (
    userHasPermission(authenticatedUser.value, permissions.reviewsWrite) ||
    userHasPermission(authenticatedUser.value, permissions.reviewsAdmin)
  )
})

const userCanAdministerReviews = computed(() => userHasPermission(authenticatedUser.value, permissions.reviewsAdmin))

const userHasPermission = (user, permission) => {
  return user !== null && user.permissions.find((p) => p.name === permission) !== undefined
}

initializeUser()
router.beforeEach(updateUser)

function initializeUser() {
  const baseUrl = import.meta.env.VITE_API_URL
  axios
    .get(baseUrl + '/auth/user', { withCredentials: true })
    .then((response) => (authenticatedUser.value = response.data.user))
    .catch((error) => (authenticatedUser.value = null))
}

async function updateUser() {
  try {
    if (authenticatedUser.value !== null) {
      const response = await axios.get('/auth/user')
      authenticatedUser.value = response.data.user
    }
  } catch (error) {
    authenticatedUser.value = null
  }
}

async function signUp(username, password, name) {
  try {
    authenticatedUser.value = null

    username = username.trim()
    name = name.trim()

    const error = validator.validateSignUp(username, password, name)
    if (error) {
      return { error }
    }

    const response = await axios.post('/auth/signup', { name }, { auth: { username, password } })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

async function logIn(username, password) {
  try {
    authenticatedUser.value = null

    username = username.trim()

    const error = validator.validateLogIn(username, password)
    if (error) {
      return { error }
    }

    const response = await axios.post('/auth/login', null, { auth: { username, password } })
    authenticatedUser.value = response.data.user
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

async function logOut() {
  try {
    authenticatedUser.value = null
    const response = await axios.post('/auth/logout')
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

function handleError(error) {
  if (error.response) {
    console.log(error.response.data)
    return error.response.data
  }

  if (error.request) {
    console.error(error)
    return { error: { message: 'Failed to connect to server.' } }
  }

  console.error(error)
  return { error: { message: 'Something went wrong.' } }
}

export default function useAuthenticationService() {
  return {
    permissions,
    user: readonlyAuthenticatedUser,
    userIsAuthenticated,
    userCanEditFilms,
    userCanEditReviews,
    userCanAdministerReviews,
    signUp,
    logIn,
    logOut
  }
}
