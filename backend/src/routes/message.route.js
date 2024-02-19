import express from 'express'
import { createMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.post('/messages', createMessage)

export default router
