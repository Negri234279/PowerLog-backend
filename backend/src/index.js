const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const indexRoutes = require('./router/index.routes')
const { appPort } = require('./config')

const app = express()

//Middleware
app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//Routes
app.use(indexRoutes)

app.use((err, req, res, next) => res.json({ message: err.message }))
app.listen(appPort, () => { console.log(`Server running in: localhost:${appPort}`) })