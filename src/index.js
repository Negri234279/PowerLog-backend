import { PORT } from './infrastructure/config/common.js'
import { initializeHttpServer } from './infrastructure/config/initializeHttp.js'

const bootstrap = async () => {
    const httpServer = initializeHttpServer()

    httpServer.listen(PORT, () => { console.log(`Server running in: http://localhost:${PORT}`) })
}

bootstrap()