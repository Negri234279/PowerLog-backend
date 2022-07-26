import { Router } from 'express'
import { user } from './user.routes.js'
import { workout } from './workout.routes.js'

const router = Router()

router.use('/auth', user)
router.use('/workout', workout)

export default router