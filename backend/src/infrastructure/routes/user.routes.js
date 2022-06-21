const { Router } = require('express')
const { userRegisterController, userLoginController, userProfileController } = require('../controller/user.controller')
const authorize = require('../middlewares/authorize')

const router = Router()

router.post('/register', userRegisterController)
router.post('/login', userLoginController)
router.get('/profile', authorize, userProfileController)

module.exports = router