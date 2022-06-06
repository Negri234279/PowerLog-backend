const { Router } = require('express')
const { userRegisterController, userLoginController } = require('../controller/user.controller')

const router = Router()

//router.post('/register', userRegisterController)
router.post('/login', userLoginController)

module.exports = router