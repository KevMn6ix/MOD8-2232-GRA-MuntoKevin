const minimumInteger = -(Math.pow(2, 32) / 2)
const maximumInteger = Math.pow(2, 32) / 2 - 1

function validateFindReview(reviewId, filmId) {
  return validateReviewId(reviewId) ?? validateFilmId(filmId)
}

function validateFindReviews(options) {
  if (options === undefined) {
    return null
  }

  const filmId = options.filmId
  if (filmId !== undefined) {
    const err = validateFilmId(filmId)
    if (err) {
      return err
    }
  }

  const username = options.username
  if (username !== undefined) {
    const err = validateUsername(username)
    if (err) {
      return err
    }
  }

  return (
    validateSearch(options.search) ??
    validateMinimumRating(options.minimumRating) ??
    validateMaximumRating(options.maximumRating) ??
    validatePagination(options.pagination)
  )
}

function validateCreateReview(filmId, title, rating, text) {
  return validateFilmId(filmId) ?? validateTitle(title) ?? validateRating(rating) ?? validateText(text)
}

function validateReplaceReview(reviewId, filmId, title, rating, text) {
  return (
    validateReviewId(reviewId) ??
    validateFilmId(filmId) ??
    validateTitle(title) ??
    validateRating(rating) ??
    validateText(text)
  )
}

function validateUpdateReview(reviewId, filmId, title, rating, text) {
  const err = validateReviewId(reviewId) ?? validateFilmId(filmId)

  if (err) {
    return err
  }

  if (title === undefined && rating === undefined && text === undefined) {
    return new Error('All modifiable review properties are missing.')
  }

  if (title !== undefined) {
    const err = validateTitle(title)
    if (err) {
      return err
    }
  }

  if (rating !== undefined) {
    const err = validateRating(rating)
    if (err) {
      return err
    }
  }

  if (text !== undefined) {
    const err = validateText(text)
    if (err) {
      return err
    }
  }

  return null
}

function validateDeleteReview(reviewId, filmId) {
  return validateReviewId(reviewId) ?? validateFilmId(filmId)
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

function validateMinimumRating(minimumRating) {
  if (minimumRating !== undefined) {
    if (!Number.isInteger(minimumRating)) {
      return new Error('Minimum rating must be an integer.')
    }

    if (minimumRating < 1) {
      return new Error('Minimum rating must be no less than 1.')
    }

    if (minimumRating > 5) {
      return new Error('Minimum rating must be no greater than 5.')
    }
  }

  return null
}

function validateMaximumRating(maximumRating) {
  if (maximumRating !== undefined) {
    if (!Number.isInteger(maximumRating)) {
      return new Error('Maximum rating must be an integer.')
    }

    if (maximumRating < 1) {
      return new Error('Maximum rating must be no less than 1.')
    }

    if (maximumRating > 5) {
      return new Error('Maximum rating must be no greater than 5.')
    }
  }

  return null
}

function validatePagination(pagination) {
  if (pagination !== undefined) {
    if (typeof pagination !== 'object') {
      return new Error('Pagination must be an object.')
    }

    const page = pagination.page
    if (page !== undefined) {
      if (!Number.isInteger(page)) {
        return new Error('Page must be an integer.')
      }

      if (page < 1) {
        return new Error('Page must be no less than 1.')
      }

      if (page > maximumInteger) {
        return new Error(`Page must be no greater than ${maximumInteger}.`)
      }
    }

    const size = pagination.size
    if (size !== undefined) {
      if (!Number.isInteger(size)) {
        return new Error('Size must be an integer.')
      }

      if (size < 1) {
        return new Error('Size must be no less than 1.')
      }

      if (size > maximumInteger) {
        return new Error(`Size must be no greater than ${maximumInteger}.`)
      }
    }
  }

  return null
}

function validateReviewId(id) {
  if (id === undefined) {
    return new Error('Review id is missing.')
  }

  if (!Number.isInteger(id)) {
    return new Error('Review id must be an integer.')
  }

  if (id < minimumInteger) {
    return new Error(`Id must be no less than ${minimumInteger}.`)
  }

  if (id > maximumInteger) {
    return new Error(`Id must be no greater than ${maximumInteger}.`)
  }

  return null
}

function validateFilmId(filmId) {
  if (filmId === undefined) {
    return new Error('Film id is missing.')
  }

  if (!Number.isInteger(filmId)) {
    return new Error('Film id must be an integer.')
  }

  if (filmId < minimumInteger) {
    return new Error(`Film id must be no less than ${minimumInteger}.`)
  }

  if (filmId > maximumInteger) {
    return new Error(`Film id must be no greater than ${maximumInteger}.`)
  }

  return null
}

function validateUsername(username) {
  if (username === undefined) {
    return new Error('Username is missing.')
  }

  if (typeof username !== 'string') {
    return new Error('Username must be a string.')
  }

  username = username.trim()

  if (username === '') {
    return new Error('Username must not be empty.')
  }

  if (username.length > 50) {
    return new Error('Username must be no longer than 50 characters.')
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

function validateRating(rating) {
  if (rating === undefined) {
    return new Error('Rating is missing.')
  }

  if (!Number.isInteger(rating)) {
    return new Error('Rating must be an integer.')
  }

  if (rating < 1) {
    return new Error('Rating must be no less than 1.')
  }

  if (rating > 5) {
    return new Error('Rating must be no greater than 5.')
  }

  return null
}

function validateText(text) {
  if (text === undefined) {
    return new Error('Text is missing.')
  }

  if (typeof text !== 'string') {
    return new Error('Text must be a string.')
  }

  text = text.trim()

  if (text === '') {
    return new Error('Text must not be empty.')
  }

  if (text.length > 10000) {
    return new Error('Text must be no longer than 10000 characters.')
  }

  return null
}

export default {
  validateFindReview,
  validateFindReviews,
  validateCreateReview,
  validateReplaceReview,
  validateUpdateReview,
  validateDeleteReview
}
