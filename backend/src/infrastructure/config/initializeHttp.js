const { createServer } = require('http')
const express = require('express')
const cors = require('cors')
const { NODE_ENV } = require('./common')
const router = require('../routes/index.routes')
const errorMiddleware = require('../middlewares/error.middleware')

const initializeHttpServer = () => {
    const app = express()
    
    app.disable('x-powered-by')
    app.use(cors())
    app.use(express.json())
    //app.use(errorMiddleware)
    //app.use((err, req, res, next) => res.json({ message: err.message }))

    if (NODE_ENV === 'dev') {
        const morgan = require('morgan')

        app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 100 }
        }))
    }
    
    app.use('/api', router)

    app.use(errorMiddleware)

    const httpServer = createServer(app)

    return httpServer
}

module.exports = { initializeHttpServer }