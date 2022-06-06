const { PORT } = require("./infrastructure/config/common")
const { initializeHttpServer } = require("./infrastructure/config/initializeHttp")

const bootstrap = async () => {
    const httpServer = initializeHttpServer()

    httpServer.listen(PORT, () => { console.log(`Server running in: http://localhost:${PORT}`) })
}

bootstrap()