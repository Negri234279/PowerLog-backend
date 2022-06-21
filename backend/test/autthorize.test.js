const request = require('supertest')
const { initializeHttpServer } = require('../src/infrastructure/config/initializeHttp')

let app
let token

describe('Test Middeware Authorize', () => {

    beforeEach(() => {
        app = initializeHttpServer()
        //app.listen(3000)
    })    

    test('Get id', () => {
        request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'email': 'rafalejo01@gmail.com',
                'password': 'admin'
            })
            .expect(200)
            .end((res) => {
                token = res.body
            })
    })

    console.log(token);

    test('Sucesfully', () => {
        request(app)
            .get('/api/auth/profile')
            .set('Content-Type', 'application/json')
            .send({
                'jwt': 'token',
                'id': 'asdasd'
            })
            .expect(200)
    })

    afterEach(() => {
        app.close()
    })

})