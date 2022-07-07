import { Router } from 'express'
import user from './user.routes.js'

const router = Router()

router.use('/auth', user)

export default router