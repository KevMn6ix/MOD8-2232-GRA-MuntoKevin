import express from 'express'

const router = express.Router()

// GET request handler for /health endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'Healthy' }) // Send 200 response with health status in JSON body
})

export default router
