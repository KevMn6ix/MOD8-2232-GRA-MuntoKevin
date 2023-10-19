import database from './database.js'
import normalizer from '../utility/string-normalizer.js'

const getReviewCount = async (options) => {
  const command = buildCountCommand(options)
  const [result] = await database.execute(command.query, command.parameters)
  return result[0].total
}

function buildCountCommand(options) {
  const baseQuery = 'SELECT COUNT(id) total FROM reviews'

  const conditions = []
  const parameters = []

  addFindCommandConditions(options, conditions, parameters)

  const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : ''
  const query = `${baseQuery}${whereClause};`
  return { query, parameters }
}

const findReview = async (reviewId, filmId) => {
  const query = `SELECT id, film_id, username, date_posted, title, rating, text FROM reviews
    WHERE id = ? AND film_id = ?;`
  const [rows] = await database.execute(query, [reviewId, filmId])
  return rows.length > 0 ? mapReview(rows[0]) : null
}

const findReviews = async (options) => {
  const command = buildFindCommand(options)
  const [rows] = await database.execute(command.query, command.parameters)
  return rows.map(mapReview)
}

function mapReview(row) {
  return {
    id: row.id,
    filmId: row.film_id,
    username: row.username,
    title: row.title,
    rating: row.rating,
    text: row.text,
    datePosted: row.date_posted
  }
}

function buildFindCommand(options) {
  const baseQuery = 'SELECT id, film_id, username, date_posted, title, rating, text FROM reviews'
  const orderByClause = ' ORDER BY rating DESC, date_posted DESC'
  let limitClause = ' LIMIT 0, 1000'

  const conditions = []
  const parameters = []

  addFindCommandConditions(options, conditions, parameters)

  if (options?.pagination) {
    const pagination = options.pagination
    const offset = (pagination.page - 1) * pagination.size
    const limit = pagination.size
    limitClause = ' LIMIT ?, ?'
    // Convert integer parameters to strings due to MySQL LIMIT clause bug.
    parameters.push(String(offset), String(limit))
  }

  const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : ''
  const query = `${baseQuery}${whereClause}${orderByClause}${limitClause};`
  return { query, parameters }
}

function addFindCommandConditions(options, conditions, parameters) {
  if (options?.filmId) {
    conditions.push('film_id = ?')
    parameters.push(options.filmId)
  }

  if (options?.username) {
    conditions.push('username = ?')
    parameters.push(options.username)
  }

  if (options?.search) {
    const search = `%${normalizer.normalizeString(options.search)}%`
    conditions.push('title LIKE ?')
    parameters.push(search, search)
  }

  if (options?.minimumRating) {
    conditions.push('rating >= ?')
    parameters.push(options.minimumRating)
  }

  if (options?.maximumRating) {
    conditions.push('rating <= ?')
    parameters.push(options.maximumRating)
  }
}

const createReview = async (filmId, username, datePosted, title, rating, text) => {
  const review = {
    id: 0,
    filmId,
    username,
    datePosted,
    title,
    rating,
    text
  }

  const query = 'INSERT INTO reviews (film_id, username, date_posted, title, rating, text) VALUES (?, ?, ?, ?, ?, ?);'
  const parameters = [review.filmId, review.username, review.datePosted, review.title, review.rating, review.text]
  const [result] = await database.execute(query, parameters)
  review.id = result.insertId
  return review
}

const updateReview = async (reviewId, filmId, title, rating, text) => {
  const values = {
    title: title,
    rating: rating,
    text: text
  }

  const command = buildUpdateCommand(reviewId, filmId, values)
  const [result] = await database.execute(command.query, command.parameters)
  return result.affectedRows > 0
}

function buildUpdateCommand(reviewId, filmId, values) {
  const columns = []
  const parameters = []

  for (const column in values) {
    const parameter = values[column]
    if (parameter !== undefined) {
      columns.push(column)
      parameters.push(parameter)
    }
  }

  const columnAssignments = columns.map((column) => column + ' = ?').join(', ')
  const query = `UPDATE reviews SET ${columnAssignments} WHERE id = ? AND film_id = ?;`
  parameters.push(reviewId)
  parameters.push(filmId)

  return { query, parameters }
}

const deleteReview = async (reviewId, filmId) => {
  const query = 'DELETE FROM reviews WHERE id = ? AND film_id = ?;'
  const [result] = await database.execute(query, [reviewId, filmId])
  return result.affectedRows > 0
}

export default {
  getReviewCount,
  findReviews,
  findReview,
  createReview,
  updateReview,
  deleteReview
}
