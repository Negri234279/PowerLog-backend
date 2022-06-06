const { Router } = require('express')
const user = require('./user.routes')

const router = Router()

router.get('/', (req, res) => res.status(200).send('Hello World!'))
router.use('/auth', user)

module.exports = router