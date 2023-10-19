import axios from 'axios'
import validator from '../validators/film-validator.js'

const findFilm = async (id) => {
  try {
    const response = await axios.get(`/films/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const findFilms = async (query) => {
  try {
    const response = await axios.get('/films', { params: query })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const createFilm = async (title, director, year, duration, description) => {
  try {
    const error = validator.validateFilm(title, director, year, duration, description)
    if (error) {
      return { error }
    }

    const response = await axios.post('/films', { title, director, year, duration, description })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const updateFilm = async (id, title, director, year, duration, description) => {
  try {
    const error = validator.validateFilm(title, director, year, duration, description)
    if (error) {
      return { error }
    }

    await axios.patch(`/films/${id}`, { title, director, year, duration, description })
    return { success: { message: 'Successfully saved film.' } }
  } catch (error) {
    return handleError(error)
  }
}

const deleteFilm = async (id) => {
  try {
    await axios.delete(`/films/${id}`)
    return { success: { message: 'Successfully deleted film.' } }
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

export default function useFilmService() {
  return {
    findFilm,
    findFilms,
    createFilm,
    updateFilm,
    deleteFilm
  }
}
