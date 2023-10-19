function validateBook(title, author, year, pageCount, description) {
  return (
    validateTitle(title) ??
    validateAuthor(author) ??
    validateYear(year) ??
    validatePageCount(pageCount) ??
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

function validateAuthor(author) {
  if (author === undefined) throw new Error('Author is missing.')
  if (typeof author !== 'string') throw new Error('Author must be a string.')

  author = author.trim()

  if (author === '') {
    return new Error('Enter a author.')
  }

  if (author.length > 255) {
    return new Error('Enter a author no longer than 255 characters.')
  }

  return null
}

function validateYear(year) {
  if (year === undefined) throw new Error('Year is missing.')
  if (!Number.isInteger(year)) throw new Error('Year must be an integer.')

  if (year < -10000) {
    return new Error('Enter a year no earlier than 10000 BCE.')
  }

  if (year > 1000000) {
    return new Error('Enter a year no later than 1000000 CE.')
  }

  return null
}

function validatePageCount(pageCount) {
  if (pageCount === undefined) throw new Error('Page count is missing.')
  if (!Number.isInteger(pageCount)) throw new Error('Page count must be an integer.')

  if (pageCount < 1) {
    return new Error('Enter a page count no less than 1.')
  }

  if (pageCount > 1000000) {
    return new Error('Enter a page count no greater than 1000000.')
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

export default { validateBook }
