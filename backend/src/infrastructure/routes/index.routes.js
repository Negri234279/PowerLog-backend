const { Router } = require('express')
const user = require('./user.routes')
const workout = require('./workout.routes')

const router = Router()

router.get('/', (req, res) => res.status(200).send('Hello World!'))
router.use('/auth', user)
router.use('/workout' , workout)

module.exports = router