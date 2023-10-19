import express from 'express'
import authenticator from '../../middleware/request-authenticator.js'
import { createAuthorizer, createAuthorizationError } from '../../middleware/request-authorizer.js'
import { createNotFoundError } from '../../middleware/not-found-handler.js'
import validator from '../../validators/review-validator.js'
import repository from '../../persistence/review-repository.js'
import createPaginator from '../../utility/paginator.js'

const router = express.Router()

const authorizer = createAuthorizer(['reviews-write', 'reviews-admin'], false)

const editReviewAuthorizer = async (req, res, next) => {
  try {
    const user = req.session.user
    if (user.permissions.find((permission) => permission.name === 'reviews-admin') !== undefined) {
      return next()
    }

    const reviewId = Number.parseInt(req.params.reviewId)
    const filmId = Number.parseInt(req.params.filmId)

    const err = validator.validateFindReview(reviewId, filmId)
    if (err) {
      err.status = 400
      return next(err)
    }

    const review = await repository.findReview(reviewId, filmId)

    if (review == null) {
      next(createNotFoundError())
    } else if (review.username !== user.username) {
      next(createAuthorizationError())
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

// GET request handler for /films/:filmId/reviews endpoint (public)
router.get('/films/:filmId/reviews', async (req, res, next) => {
  try {
    const filmId = Number.parseInt(req.params.filmId)

    // Validate request parameters, and return null if valid or error if invalid
    const options = { filmId, search: req.query.search, pagination: { page: req.query.page, size: req.query.size } }
    const err = validator.validateFindReviews(options)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    const count = await repository.getReviewCount(options)

    const paginator = createPaginator(10, 100) // Create paginator with default page size 10, max page size 100
    const pagination = paginator.createPagination(options.pagination.page, options.pagination.size, count) // Create pagination
    options.pagination = pagination

    const reviews = await repository.findReviews(options) // Find reviews in database table based on search and pagination

    const links = paginator.createPageLinks(pagination, req.baseUrl + req.path, req.query) // Create page links to first/previous/next/last pages
    res.status(200).json({ reviews, pagination, links }) // Send 200 response with reviews, pagination, and links in JSON body
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// POST request handler for /films/:filmId/reviews endpoint (authenticated + authorized)
router.post('/films/:filmId/reviews', authenticator, authorizer, async (req, res, next) => {
  try {
    const filmId = Number.parseInt(req.params.filmId)
    const username = req.session.user.username
    const title = req.body.title
    const rating = req.body.rating
    const text = req.body.text

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateCreateReview(filmId, title, rating, text)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    const datePosted = new Date(Date.now())

    // Insert review in database table
    const review = await repository.createReview(filmId, username, datePosted, title, rating, text)
    res.status(201).json({ review }) // Send 201 response with created review in body
  } catch (err) {
    // Catch any internal server error
    if (err.code === 'ER_DUP_ENTRY') {
      const error = new Error(`Reviewers cannot post multiple reviews of the same film.`, { cause: err })
      error.status = 409
      next(error)
    } else {
      next(err) // Pass error to next error handler middleware
    }
  }
})

// GET request handler for /films/:filmId/reviews/:reviewId endpoint (public)
router.get('/films/:filmId/reviews/:reviewId', async (req, res, next) => {
  try {
    const reviewId = Number.parseInt(req.params.reviewId)
    const filmId = Number.parseInt(req.params.filmId)

    // Validate request parameters, and return null if valid or error if invalid
    const err = validator.validateFindReview(reviewId, filmId)
    if (err) {
      err.status = 400 // Set error status to 400
      return next(err) // Pass error to next error handler middleware and return
    }

    const review = await repository.findReview(reviewId, filmId) // Find review by id in database table
    if (review) {
      res.status(200).json({ review }) // Send 200 response with review in body
    } else {
      next() // Pass request to next request handler or middleware
    }
  } catch (err) {
    // Catch any internal server error
    next(err) // Pass error to next error handler middleware
  }
})

// PUT request handler for /films/:filmId/reviews/:reviewId endpoint (authenticated + authorized)
router.put(
  '/films/:filmId/reviews/:reviewId',
  authenticator,
  authorizer,
  editReviewAuthorizer,
  async (req, res, next) => {
    try {
      const reviewId = Number.parseInt(req.params.reviewId)
      const filmId = Number.parseInt(req.params.filmId)
      const title = req.body.title
      const rating = req.body.rating
      const text = req.body.text

      // Validate request parameters, and return null if valid or error if invalid
      const err = validator.validateReplaceReview(reviewId, filmId, title, rating, text)
      if (err) {
        err.status = 400 // Set error status to 400
        return next(err) // Pass error to next error handler middleware and return
      }

      // Update review in database table
      const updated = await repository.updateReview(reviewId, filmId, title, rating, text)
      if (updated) {
        res.sendStatus(200) // Send 200 response indicating review was successfully updated
      } else {
        next() // Pass request to next request handler or middleware
      }
    } catch (err) {
      // Catch any internal server error
      next(err) // Pass error to next error handler middleware
    }
  }
)

// PATCH request handler for /films/:filmId/reviews/:reviewId endpoint (authenticated + authorized)
router.patch(
  '/films/:filmId/reviews/:reviewId',
  authenticator,
  authorizer,
  editReviewAuthorizer,
  async (req, res, next) => {
    try {
      const reviewId = Number.parseInt(req.params.reviewId)
      const filmId = Number.parseInt(req.params.filmId)
      const title = req.body.title
      const rating = req.body.rating
      const text = req.body.text

      // Validate request parameters, and return null if valid or error if invalid
      const err = validator.validateUpdateReview(reviewId, filmId, title, rating, text)
      if (err) {
        err.status = 400 // Set error status to 400
        return next(err) // Pass error to next error handler middleware and return
      }

      // Update review in database table
      const updated = await repository.updateReview(reviewId, filmId, title, rating, text)
      if (updated) {
        res.sendStatus(200) // Send 200 response indicating review was successfully updated
      } else {
        next() // Pass request to next request handler or middleware
      }
    } catch (err) {
      // Catch any internal server error
      next(err) // Pass error to next error handler middleware
    }
  }
)

// DELETE request handler for /films/:filmId/reviews/:reviewId endpoint (authenticated + authorized)
router.delete(
  '/films/:filmId/reviews/:reviewId',
  authenticator,
  authorizer,
  editReviewAuthorizer,
  async (req, res, next) => {
    try {
      const reviewId = Number.parseInt(req.params.reviewId)
      const filmId = Number.parseInt(req.params.filmId)

      // Validate request parameters, and return null if valid or error if invalid
      const err = validator.validateDeleteReview(reviewId, filmId)
      if (err) {
        err.status = 400 // Set error status to 400
        return next(err) // Pass error to next error handler middleware and return
      }

      const deleted = await repository.deleteReview(reviewId, filmId) // Delete review from database table
      if (deleted) {
        res.sendStatus(200) // Send 200 response indicating review was successfully deleted
      } else {
        next() // Pass request to next request handler or middleware
      }
    } catch (err) {
      // Catch any internal server error
      next(err) // Pass error to next error handler middleware
    }
  }
)

export default router
