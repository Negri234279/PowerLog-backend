const request = require('supertest')
const { initializeHttpServer } = require('../src/infrastructure/config/initializeHttp')

let app

describe('Test Endpoints Login', () => {

    beforeEach(() => {
        app = initializeHttpServer()
        //app.listen(3001)
    })

    test('Login succesfully', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo01@gmail.com',
                'password': 'admin'
            })
            .expect(200)
    })

    test('Login failed - Invalid email format', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo01gmail.com',
                'password': 'admin'
            })
            .expect(400)
    })

    test('Login failed - Invalid email exist', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo@gmail.com',
                'password': 'admin'
            })
            .expect(409)
    })

    test('Login failed - Invalid password', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo01@gmail.com',
                'password': 'admi'
            })
            .expect(409)
    })

    test('Login failed - Missing fields', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo01@gmail.com'
            })
            .expect(400)
    })

    test('Login failed - Unnecesary fields', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo01@gmail.com',
                'password': 'admin',
                'name': 'rafa'
            })
            .expect(400)
    })

    afterEach(() => {
        app.close()
    })

})