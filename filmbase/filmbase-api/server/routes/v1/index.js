import express from 'express'
import health from './health.js'
import auth from './auth.js'
import films from './films.js'
import reviews from './reviews.js'

const router = express.Router()

router.use(health)
router.use(auth)
router.use(films)
router.use(reviews)

export default router
