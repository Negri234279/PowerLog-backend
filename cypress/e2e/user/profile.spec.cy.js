const url = 'auth/profile'
let userAuthorization

describe('Test Endpoints Profile', () => {
    it('Get Authorization', () => {
        const REGEX_JWT = /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm
        cy.request('POST', 'auth/login', {
            'email': 'test@test.com',
            'password': 'Administrador1234'
        })
            .then(res => {
                expect(res.status).to.eq(200)
                expect(REGEX_JWT.test(res.body)).to.be.true
                userAuthorization = res.body
            })
    })

    it('Profile succesfully', () => {
        cy.request({
            method: 'GET',
            url,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userAuthorization
            }
        })
            .then(res => {
                expect(res.status).to.eq(200)
                expect(res.body).to.deep.eq({
                    "email": "test@test.com",
                    "name": "test"
                })
            })
    })

    it('Profile failed - Missing bearer', () => {
        cy.request({
            method: 'GET',
            url,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                expect(res.status).to.eq(401)
                expect(res.body).to.eq('Missing bearer')
            })
    })

    it('Profile failed - Invalid bearer', () => {
        const Authorization = userAuthorization.slice(0, -1)
        
        cy.request({
            method: 'GET',
            url,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
                Authorization
            }
        })
            .then(res => {
                expect(res.status).to.eq(403)
                expect(res.body).to.eq('Invalid bearer')
            })
    })

    it('Profile failed - Unnecesary fields', () => {
        cy.request({
            method: 'GET',
            url,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userAuthorization
            },
            body: {
                'email': 'tesest.com',
                'password': 'Administrador1234'
            }
        })
            .then(res => {
                expect(res.status).to.eq(400)
                expect(res.body).to.eq('Unnecessary fields format')
            })
    })

})