import express from 'express'
import health from './health.js'
import auth from './auth.js'
import books from './books.js'

const router = express.Router()

router.use(health)
router.use(auth)
router.use(books)

export default router
