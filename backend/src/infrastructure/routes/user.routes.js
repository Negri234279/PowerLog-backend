const { Router } = require('express')
const container = require('../container')
const authorize = require('../middlewares/authorize')

const router = Router()

const userLoginController = container.resolve('userLoginController')
const userRegisterController = container.resolve('userRegisterController')
const userProfileController = container.resolve('userProfileController')

router.post('/login', userLoginController.execute.bind(userLoginController))
router.post('/register', userRegisterController.execute.bind(userRegisterController))
router.get('/profile', authorize, userProfileController.execute.bind(userProfileController))

module.exports = router