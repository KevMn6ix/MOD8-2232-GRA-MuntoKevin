import express from 'express'
import authenticator from '../../middleware/request-authenticator.js'
import createAuthorizer from '../../middleware/request-authorizer.js'
import validator from '../../validators/film-validator.js'
import repository from '../../persistence/film-repository.js'
import createPaginator from '../../utility/paginator.js'

const router = express.Router()
const authorizer = createAuthorizer(['films-write'])

// GET request handler for /films endpoint (public)
router.get('/films', async (req, res, next) => {
  try {
    // Validate request parameters, and return null if valid or error if invalid
    const options = { search: req.query.search, pagination: { page: req.query.page, size: req.query.size } }
    const err = validator.validateFindFilms(options)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    const count = await repository.getFilmCount(options)

    const paginator = createPaginator(10, 100) // Create paginator with default page size 10, max page size 100
    const pagination = paginator.createPagination(options.pagination.page, options.pagination.size, count) // Create pagination
    options.pagination = pagination

    const films = await repository.findFilms(options) // Find films in database table based on search and pagination

    const links = paginator.createPageLinks(pagination, req.baseUrl + req.path, req.query) // Create page links to first/previous/next/last pages
    res.status(200).json({ films, pagination, links }) // Send 200 response with films, pagination, and links in JSON body
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// POST request handler for /films endpoint (authenticated + authorized)
router.post('/films', authenticator, authorizer, async (req, res, next) => {
  try {
    const title = req.body.title
    const director = req.body.director
    const year = req.body.year
    const duration = req.body.duration
    const description = req.body.description

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateCreateFilm(title, director, year, duration, description)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    // Insert film in database table
    const film = await repository.createFilm(title, director, year, duration, description)
    res.status(201).json({ film }) // Send 201 response with created film in body
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// GET request handler for /films/:id endpoint (public)
router.get('/films/:id', async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id)

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateFindFilm(id)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    const film = await repository.findFilm(id) // Find film by id in database table
    if (film) {
      res.status(200).json({ film }) // Send 200 response with film in body
    } else {
      next() // Pass request to next request handler or middleware
    }
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// PUT request handler for /films/:id endpoint (authenticated + authorized)
router.put('/films/:id', authenticator, authorizer, async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id)
    const title = req.body.title
    const director = req.body.director
    const year = req.body.year
    const duration = req.body.duration
    const description = req.body.description

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateReplaceFilm(id, title, director, year, duration, description)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    // Update film in database table
    const updated = await repository.updateFilm(id, title, director, year, duration, description)
    if (updated) {
      res.sendStatus(200) // Send 200 response indicating film was successfully updated
    } else {
      next() // Pass request to next request handler or middleware
    }
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// PATCH request handler for /films/:id endpoint (authenticated + authorized)
router.patch('/films/:id', authenticator, authorizer, async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id)
    const title = req.body.title
    const director = req.body.director
    const year = req.body.year
    const duration = req.body.duration
    const description = req.body.description

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateUpdateFilm(id, title, director, year, duration, description)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    // Update film in database table
    const updated = await repository.updateFilm(id, title, director, year, duration, description)
    if (updated) {
      res.sendStatus(200) // Send 200 response indicating film was successfully updated
    } else {
      next() // Pass request to next request handler or middleware
    }
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// DELETE request handler for /films/:id endpoint (authenticated + authorized)
router.delete('/films/:id', authenticator, authorizer, async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id)

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateDeleteFilm(id)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    const deleted = await repository.deleteFilm(id) // Delete film from database table
    if (deleted) {
      res.sendStatus(200) // Send 200 response indicating film was successfully deleted
    } else {
      next() // Pass request to next request handler or middleware
    }
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

export default router
