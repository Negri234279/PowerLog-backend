const { Router } = require('express')
const container = require('../container')
const userProfileController = require('../controller/user/userProfile.controller')
const userRegisterController = require('../controller/user/userRegister.controller')
const authorize = require('../middlewares/authorize')

const router = Router()

const userLoginController = container.resolve('userLoginController')

router.post('/register', userRegisterController)
router.post('/login', userLoginController.execute.bind(userLoginController))
router.get('/profile', authorize, userProfileController)

module.exports = router