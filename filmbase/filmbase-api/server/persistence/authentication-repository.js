import database from './database.js'

const findUserCredentials = async (username) => {
  const query = 'SELECT username, password FROM users WHERE username = ?;'
  const [rows] = await database.execute(query, [username])
  const credentials = rows.length > 0 ? mapUserCredentials(rows[0]) : null
  return credentials
}

function mapUserCredentials(row) {
  return {
    username: row.username,
    password: String(row.password)
  }
}

const findUser = async (username) => {
  const connection = await database.getConnection()

  try {
    const query = 'SELECT username, name FROM users WHERE username = ?;'
    const [rows] = await connection.execute(query, [username])

    if (rows.length == 0) {
      return null
    }

    const user = mapUser(rows[0])
    user.roles = await findUserRoles(username, connection)
    user.permissions = await findUserPermissions(username, connection)
    return user
  } finally {
    connection.release()
  }
}

function mapUser(row) {
  return {
    username: row.username,
    name: row.name
  }
}

const findUserRoles = async (username, connection) => {
  const query = `SELECT DISTINCT r.id, r.name from roles r
    INNER JOIN user_roles ur
    ON r.id = ur.role_id
    WHERE ur.username = ?;`
  const [rows] = await connection.execute(query, [username])
  return rows.map(mapUserRole)
}

function mapUserRole(row) {
  return {
    id: row.id,
    name: row.name
  }
}

const findUserPermissions = async (username, connection) => {
  const query = `SELECT DISTINCT p.id, p.name FROM permissions p
    INNER JOIN role_permissions rp
    INNER JOIN user_roles ur
    ON ur.role_id = rp.role_id
    ON p.id = rp.permission_id
    WHERE ur.username = ?;`
  const [rows] = await connection.execute(query, [username])
  return rows.map(mapUserPermission)
}

function mapUserPermission(row) {
  return {
    id: row.id,
    name: row.name
  }
}

const createUser = async (username, password, name, roles) => {
  const connection = await database.getConnection()

  try {
    await connection.beginTransaction()

    const query = 'INSERT INTO users (username, password, name) VALUES (?, ?, ?);'
    const [result] = await connection.execute(query, [username, password, name])
    if (result.affectedRows === 0) {
      throw new Error(`Failed to create user "${username}".`)
    }

    if (Array.isArray(roles) && roles.length > 0) {
      await addUserRoles(username, roles, connection)
    }

    await connection.commit()
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

const addUserRoles = async (username, roles, connection) => {
  const command = buildInsertRolesCommand(username, roles)
  const [result] = await connection.execute(command.query, command.parameters)
  if (result.affectedRows === 0) {
    throw new Error(`Failed to add roles to user "${username}".`)
  }
}

function buildInsertRolesCommand(username, roles) {
  const values = []
  const parameters = []

  for (const role of roles) {
    values.push('(?, (SELECT r.id from roles r WHERE r.name = ?))')
    parameters.push(username, role.name)
  }

  const query = `INSERT INTO user_roles (username, role_id) VALUES ${values.join(', ')};`
  return { query, parameters }
}

const findSession = async (id) => {
  const query = 'SELECT id, username, start_time, extended_time, expiry_time FROM sessions WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapSession(rows[0]) : null
}

function mapSession(row) {
  return {
    id: row.id,
    username: row.username,
    startTime: row.start_time,
    extendedTime: row.extended_time,
    expiryTime: row.expiry_time
  }
}

const createSession = async (session) => {
  const query = 'INSERT INTO sessions (id, username, start_time, expiry_time) VALUES (?, ?, ?, ?);'
  const [result] = await database.execute(query, [session.id, session.username, session.startTime, session.expiryTime])
  if (result.affectedRows > 0) {
    return session
  }

  throw new Error(`Failed to create session ${session.id}.`)
}

const extendSession = async (id, extendedTime, expiryTime) => {
  const query = 'UPDATE sessions SET extended_time = ?, expiry_time = ? WHERE id = ?;'
  const [result] = await database.execute(query, [extendedTime, expiryTime, id])
  if (result.affectedRows === 0) {
    throw new Error(`Failed to extend session ${id}.`)
  }
}

const deleteSession = async (id) => {
  const query = 'DELETE FROM sessions WHERE id = ?;'
  const [result] = await database.execute(query, [id])
  return result.affectedRows > 0
}

export default {
  findUserCredentials,
  findUser,
  createUser,
  findSession,
  createSession,
  extendSession,
  deleteSession
}
