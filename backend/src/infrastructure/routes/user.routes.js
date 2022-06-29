const { Router } = require('express')
const { userLoginController } = require('../controller/auth/userLogin.controller')
const { userProfileController } = require('../controller/auth/userProfile.controller')
const { userRegisterController } = require('../controller/auth/userRegister.controller')
const authorize = require('../middlewares/authorize')

const router = Router()

router.post('/register', userRegisterController)
router.post('/login', userLoginController)
router.get('/profile', authorize, userProfileController)

module.exports = router