const { Router } = require('express')
const { workourCreateController } = require('../controller/workout.controller')
const authorize = require('../middlewares/authorize')

const router = Router()

router.post('/', authorize, workourCreateController)

module.exports = router