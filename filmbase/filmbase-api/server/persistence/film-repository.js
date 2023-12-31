import database from './database.js'
import normalizer from '../utility/string-normalizer.js'

const getFilmCount = async (options) => {
  const command = buildCountCommand(options)
  const [result] = await database.execute(command.query, command.parameters)
  return result[0].total
}

function buildCountCommand(options) {
  const baseQuery = 'SELECT COUNT(id) total FROM films'

  const conditions = []
  const parameters = []

  addFindCommandConditions(options, conditions, parameters)

  const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : ''
  const query = `${baseQuery}${whereClause};`
  return { query, parameters }
}

const findFilm = async (id) => {
  const query = 'SELECT id, title, director, year, duration, description FROM films WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapFilm(rows[0]) : null
}

const findFilms = async (options) => {
  const command = buildFindCommand(options)
  const [rows] = await database.execute(command.query, command.parameters)
  return rows.map(mapFilm)
}

function mapFilm(row) {
  return {
    id: row.id,
    title: row.title,
    director: row.director,
    year: row.year,
    duration: row.duration,
    description: row.description
  }
}

function buildFindCommand(options) {
  const baseQuery = 'SELECT id, title, director, year, duration, description FROM films'
  const orderByClause = ' ORDER BY title ASC'
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
  if (options?.search) {
    const search = `%${normalizer.normalizeString(options.search)}%`
    conditions.push('(title LIKE ? OR director LIKE ?)')
    parameters.push(search, search)
  }
}

const createFilm = async (title, director, year, duration, description) => {
  const film = {
    id: 0,
    title: title.trim(),
    director: director.trim(),
    year,
    duration,
    description: description.trim()
  }

  const query = 'INSERT INTO films (title, director, year, duration, description) VALUES (?, ?, ?, ?, ?);'
  const parameters = [film.title, film.director, film.year, film.duration, film.description]
  const [result] = await database.execute(query, parameters)
  film.id = result.insertId
  return film
}

const updateFilm = async (id, title, director, year, duration, description) => {
  const values = {
    title: title,
    director: director,
    year: year,
    duration: duration,
    description: description
  }

  const command = buildUpdateCommand(id, values)
  const [result] = await database.execute(command.query, command.parameters)
  return result.affectedRows > 0
}

function buildUpdateCommand(id, values) {
  const columns = []
  const parameters = []

  for (const column in values) {
    const parameter = values[column]
    if (parameter !== undefined) {
      columns.push(column)
      parameters.push(parameter)
    }
  }

  const query = `UPDATE films SET ${columns.map((column) => column + ' = ?').join(', ')} WHERE id = ?;`
  parameters.push(id)

  return { query, parameters }
}

const deleteFilm = async (id) => {
  const query = 'DELETE FROM films WHERE id = ?;'
  const [result] = await database.execute(query, [id])
  return result.affectedRows > 0
}

export default {
  getFilmCount,
  findFilms,
  findFilm,
  createFilm,
  updateFilm,
  deleteFilm
}
