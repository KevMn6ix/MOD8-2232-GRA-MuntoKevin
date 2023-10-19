import axios from 'axios'
import validator from '../validators/book-validator.js'

const findBook = async (id) => {
  try {
    const response = await axios.get(`/books/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const findBooks = async (query) => {
  try {
    const response = await axios.get('/books', { params: query })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const createBook = async (title, author, year, pageCount, description) => {
  // TODO
  return { error: { message: 'Create book function in book service not implemented.' } }
}

const updateBook = async (id, title, author, year, pageCount, description) => {
  try {
    const error = validator.validateBook(title, author, year, pageCount, description)
    if (error) {
      return { error }
    }

    await axios.patch(`/books/${id}`, { title, author, year, pageCount, description })
    return { success: { message: 'Successfully saved book.' } }
  } catch (error) {
    return handleError(error)
  }
}

const deleteBook = async (id) => {
  try {
    await axios.delete(`/books/${id}`)
    return { success: { message: 'Successfully deleted book.' } }
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

export default function useBookService() {
  return {
    findBook,
    findBooks,
    createBook,
    updateBook,
    deleteBook
  }
}
