const request = require('supertest')
const { initializeHttpServer } = require('../src/infrastructure/config/initializeHttp')

let app

describe('Test Endpoints', () => {

    beforeEach(() => {
        app = initializeHttpServer()
        //app.listen(3000)
    })

    test("GET /api", async () => {
        const response = await request(app).get("/api")
        expect(response.statusCode).toBe(200)
    })

    test("GET /api v2", () => {
        request(app)
        .get("/api")
        .expect(200)
    })

    afterEach(() => {
        app.close()
    })

})