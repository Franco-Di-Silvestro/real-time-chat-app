import express from 'express'
import { sendMessage } from '../controllers/messageController'
import protectRoute from '../middleware/protectRoute'

const router = express.Router()

router.post("/send/:id", protectRoute, sendMessage)

export default router
