import { Router } from 'express'
import container from '../container.js'
import authorize from '../middlewares/authorize.js'

const router = Router()

const userLoginController = container.resolve('userLoginController')
const userRegisterController = container.resolve('userRegisterController')
const userProfileController = container.resolve('userProfileController')

router.post('/login', userLoginController.execute.bind(userLoginController))
router.post('/register', userRegisterController.execute.bind(userRegisterController))
router.get('/profile', authorize, userProfileController.execute.bind(userProfileController))

export { router as user }