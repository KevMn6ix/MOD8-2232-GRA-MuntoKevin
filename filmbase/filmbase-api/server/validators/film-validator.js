const minimumInteger = -(Math.pow(2, 32) / 2)
const maximumInteger = Math.pow(2, 32) / 2 - 1

function validateFindFilm(id) {
  return validateId(id)
}

function validateFindFilms(options) {
  if (options === undefined) {
    return null
  }

  return validateSearch(options.search) ?? validatePagination(options.pagination)
}

function validateCreateFilm(title, director, year, duration, description) {
  return (
    validateTitle(title) ??
    validateDirector(director) ??
    validateYear(year) ??
    validateDuration(duration) ??
    validateDescription(description)
  )
}

function validateReplaceFilm(id, title, director, year, duration, description) {
  return (
    validateId(id) ??
    validateTitle(title) ??
    validateDirector(director) ??
    validateYear(year) ??
    validateDuration(duration) ??
    validateDescription(description)
  )
}

function validateUpdateFilm(id, title, director, year, duration, description) {
  const err = validateId(id)
  if (err) {
    return err
  }

  const allPropertiesAreUndefined =
    title === undefined &&
    director === undefined &&
    year === undefined &&
    duration === undefined &&
    description === undefined

  if (allPropertiesAreUndefined) {
    return new Error('All modifiable film properties are missing.')
  }

  if (title !== undefined) {
    const err = validateTitle(title)
    if (err) {
      return err
    }
  }

  if (director !== undefined) {
    const err = validateDirector(director)
    if (err) {
      return err
    }
  }

  if (year !== undefined) {
    const err = validateYear(year)
    if (err) {
      return err
    }
  }

  if (duration !== undefined) {
    const err = validateDuration(duration)
    if (err) {
      return err
    }
  }

  if (description !== undefined) {
    const err = validateDescription(description)
    if (err) {
      return err
    }
  }

  return null
}

function validateDeleteFilm(id) {
  return validateId(id)
}

function validateSearch(search) {
  if (search !== undefined) {
    if (typeof search !== 'string') {
      return new Error('Search must be a string.')
    }

    if (search.length > 255) {
      return new Error('Search must be no longer than 255 characters.')
    }
  }

  return null
}

function validatePagination(pagination) {
  if (pagination !== undefined) {
    if (typeof pagination !== 'object') {
      return new Error('Pagination must be an object.')
    }

    if (pagination.page !== undefined) {
      const page = Number.parseInt(pagination.page)

      if (!Number.isInteger(page)) {
        return new Error('Page must be an integer.')
      }

      if (page < 1) {
        return new Error('Page must be no less than 1.')
      }

      if (page > maximumInteger) {
        return new Error(`Page must be no greater than ${maximumInteger}.`)
      }

      pagination.page = page
    }

    if (pagination.size !== undefined) {
      const size = Number.parseInt(pagination.size)

      if (!Number.isInteger(size)) {
        return new Error('Size must be an integer.')
      }

      if (size < 1) {
        return new Error('Size must be no less than 1.')
      }

      if (size > maximumInteger) {
        return new Error(`Size must be no greater than ${maximumInteger}.`)
      }

      pagination.size = size
    }
  }

  return null
}

function validateId(id) {
  if (id === undefined) {
    return new Error('Id is missing.')
  }

  if (!Number.isInteger(id)) {
    return new Error('Id must be an integer.')
  }

  if (id < minimumInteger) {
    return new Error(`Id must be no less than ${minimumInteger}.`)
  }

  if (id > maximumInteger) {
    return new Error(`Id must be no greater than ${maximumInteger}.`)
  }

  return null
}

function validateTitle(title) {
  if (title === undefined) {
    return new Error('Title is missing.')
  }

  if (typeof title !== 'string') {
    return new Error('Title must be a string.')
  }

  title = title.trim()

  if (title === '') {
    return new Error('Title must not be empty.')
  }

  if (title.length > 255) {
    return new Error('Title must be no longer than 255 characters.')
  }

  return null
}

function validateDirector(director) {
  if (director === undefined) {
    return new Error('Director is missing.')
  }

  if (typeof director !== 'string') {
    return new Error('Director must be a string.')
  }

  director = director.trim()

  if (director === '') {
    return new Error('Director must not be empty.')
  }

  if (director.length > 255) {
    return new Error('Director must be no longer than 255 characters.')
  }

  return null
}

function validateYear(year) {
  if (year === undefined) {
    return new Error('Year is missing.')
  }

  if (!Number.isInteger(year)) {
    return new Error('Year must be an integer.')
  }

  if (year < 1895) {
    return new Error('Year must be no earlier than 1895.')
  }

  if (year > 1000000) {
    return new Error('Year must be no greater than 1000000.')
  }

  return null
}

function validateDuration(duration) {
  if (duration === undefined) {
    return new Error('Duration is missing.')
  }

  if (!Number.isInteger(duration)) {
    return new Error('Duration must be an integer.')
  }

  if (duration < 1) {
    return new Error('Duration must be no less than 1.')
  }

  if (duration > 1000000) {
    return new Error('Duration must be no greater than 1000000.')
  }

  return null
}

function validateDescription(description) {
  if (description === undefined) {
    return new Error('Description is missing.')
  }

  if (typeof description !== 'string') {
    return new Error('Description must be a string.')
  }

  description = description.trim()

  if (description === '') {
    return new Error('Description must not be empty.')
  }

  if (description.length > 10000) {
    return new Error('Description must be no longer than 10000 characters.')
  }

  return null
}

export default {
  validateFindFilm,
  validateFindFilms,
  validateCreateFilm,
  validateReplaceFilm,
  validateUpdateFilm,
  validateDeleteFilm
}
