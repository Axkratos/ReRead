import express from 'express'
import { signup, signin} from '../controllers/user.controller.js'

const router = express.Router()

router.route('/signin').post(signin)
router.route('/signup').post(signup)

export default router
