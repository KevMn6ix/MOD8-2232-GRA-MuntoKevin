import database from './database.js'
import normalizer from '../utility/string-normalizer.js'

const getBookCount = async (options) => {
  const command = buildCountCommand(options)
  const [result] = await database.execute(command.query, command.parameters)
  return result[0].total
}

function buildCountCommand(options) {
  const baseQuery = 'SELECT COUNT(id) total FROM books'

  const conditions = []
  const parameters = []

  addFindCommandConditions(options, conditions, parameters)

  const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : ''
  const query = `${baseQuery}${whereClause};`
  return { query, parameters }
}

const findBook = async (id) => {
  const query = 'SELECT id, title, author, year, page_count, description FROM books WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapBook(rows[0]) : null
}

const findBooks = async (options) => {
  const command = buildFindCommand(options)
  const [rows] = await database.execute(command.query, command.parameters)
  return rows.map(mapBook)
}

function mapBook(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    year: row.year,
    pageCount: row['page_count'],
    description: row.description
  }
}

function buildFindCommand(options) {
  const baseQuery = 'SELECT id, title, author, year, page_count, description FROM books'
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
    conditions.push('(title LIKE ? OR author LIKE ?)')
    parameters.push(search, search)
  }
}

const createBook = async (title, author, year, pageCount, description) => {
  // TODO
  return null
}

const updateBook = async (id, title, author, year, pageCount, description) => {
  const values = {
    title: title,
    author: author,
    year: year,
    'page_count': pageCount,
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

  const query = `UPDATE books SET ${columns.map((column) => column + ' = ?').join(', ')} WHERE id = ?;`
  parameters.push(id)

  return { query, parameters }
}

const deleteBook = async (id) => {
  const query = 'DELETE FROM books WHERE id = ?;'
  const [result] = await database.execute(query, [id])
  return result.affectedRows > 0
}

export default {
  getBookCount,
  findBooks,
  findBook,
  createBook,
  updateBook,
  deleteBook
}
