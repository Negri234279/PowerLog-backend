const { Router } = require('express')
const userLoginController = require('../controller/user/userLogin.controller')
const userProfileController = require('../controller/user/userProfile.controller')
const userRegisterController = require('../controller/user/userRegister.controller')
const authorize = require('../middlewares/authorize')

const router = Router()

router.post('/register', userRegisterController)
router.post('/login', userLoginController)
router.get('/profile', authorize, userProfileController)

module.exports = router