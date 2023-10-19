function validateFilm(title, director, year, duration, description) {
  return (
    validateTitle(title) ??
    validateDirector(director) ??
    validateYear(year) ??
    validateDuration(duration) ??
    validateDescription(description)
  )
}

function validateTitle(title) {
  if (title === undefined) throw new Error('Title is missing.')
  if (typeof title !== 'string') throw new Error('Title must be a string.')

  title = title.trim()

  if (title === '') {
    return new Error('Enter a title.')
  }

  if (title.length > 255) {
    return new Error('Enter a title no longer than 255 characters.')
  }

  return null
}

function validateDirector(director) {
  if (director === undefined) throw new Error('Director is missing.')
  if (typeof director !== 'string') throw new Error('Director must be a string.')

  director = director.trim()

  if (director === '') {
    return new Error('Enter a director.')
  }

  if (director.length > 255) {
    return new Error('Enter a director no longer than 255 characters.')
  }

  return null
}

function validateYear(year) {
  if (year === undefined) throw new Error('Year is missing.')
  if (!Number.isInteger(year)) throw new Error('Year must be an integer.')

  if (year < 1895) {
    return new Error('Enter a year no earlier than 1895.')
  }

  if (year > 1000000) {
    return new Error('Enter a year no later than 1000000.')
  }

  return null
}

function validateDuration(duration) {
  if (duration === undefined) throw new Error('Duration is missing.')
  if (!Number.isInteger(duration)) throw new Error('Duration must be an integer.')

  if (duration < 1) {
    return new Error('Enter a duration no less than 1.')
  }

  if (duration > 1000000) {
    return new Error('Enter a duration no greater than 1000000.')
  }

  return null
}

function validateDescription(description) {
  if (description === undefined) throw new Error('Description is missing.')
  if (typeof description !== 'string') throw new Error('Description must be a string.')

  description = description.trim()

  if (description === '') {
    return new Error('Enter a description.')
  }

  if (description.length > 10000) {
    return new Error('Enter a description no longer than 10000 characters.')
  }

  return null
}

export default { validateFilm }
