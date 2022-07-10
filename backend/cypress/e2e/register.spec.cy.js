import uuid from 'uuid-random'

const url = 'auth/register'

const randomEmail = () => `test${Math.floor(Math.random() * 99999)}@test.com`

const user = {
	'id': uuid(),
	'email': randomEmail(),
	'password': 'Administrador1234',
	'name': 'test'
}


describe('Test Endpoints Register', () => {

	it('Register succesfully', () => {	
		const id = uuid()
		const email = randomEmail()
		cy.request('POST', url, user)
			.then(res => {
				expect(res.status).to.eq(201)
			})
	})

	it('Register failed - Duplicated ID', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				id: '5a491c15-7b90-469b-834e-120897d6d0ab'
			}
		})
			.then(res => {
				expect(res.status).to.eq(409)
			})
	})

	it('Register failed - Duplicated email', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				email: 'test@test.com'
			}
		})
			.then(res => {
				expect(res.status).to.eq(409)
			})
	})

	it('Register failed - Invalid ID format', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				id: 'sdfgsdjnftyhwrtsn5653'
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
			})
	})

	it('Register failed - Invalid name format', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				name: 'name-with-./*'
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
			})
	})

	it('Register failed - Invalid email format', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				email: 'name.test'
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
			})
	})

	it('Register failed - Invalid password format', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				password: 'pass'
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
			})
	})

	it('Register failed - Missing fields', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				email: 'user3@test.com'
			},
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Missing fields format')
			})
	})

	it('Register failed - Unnecesary fields', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				age: 25
			},
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Unnecessary fields format')
			})
	})

})