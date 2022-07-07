import { NODE_ENV } from './common.js'
import morgan from 'morgan'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import router from '../routes/index.routes.js'
import { errorMiddleware } from '../middlewares/error.middleware.js'

export const initializeHttpServer = () => {
    const app = express()
    
    app.disable('x-powered-by')
    app.use(cors())
    app.use(express.json())

    if (NODE_ENV === 'dev') {

        app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 100 }
        }))
    }
    
    app.use('/api', router)

    app.use(errorMiddleware)

    const httpServer = createServer(app)

    return httpServer
}