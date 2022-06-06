const request = require('supertest')
const { initializeHttpServer } = require('../src/infrastructure/config/initializeHttp')

let app

describe('Test Endpoints Auth', () => {

    beforeEach(() => {
        app = initializeHttpServer()
        //app.listen(3000)
    })

    test("POST /api/auth/register", () => {
        request(app)
            .post("/api/auth/register")
            .expect(200)
    })

    test("POST /api/auth/login", () => {
        request(app)
            .post("/api/auth/login")
            .expect(200)
    })

    afterEach(() => {
        app.close()
    })

})