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
				expect(res.body).to.eq('The ID is already in use')
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
				id: 'eda0bd4b-0b23-4c80-9e8b-baa38dbd1248',
				email: 'test@test.com'
			}
		})
			.then(res => {
				expect(res.status).to.eq(409)
				expect(res.body).to.eq('The email is already in use')
			})
	})

	it('Register failed - Invalid ID format', () => {
		const id = 'sdfgsdjnftyhwrtsn5653'

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				id
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOUuid: Invalid value "${id}"`)
			})
	})

	it('Register failed - Invalid name format', () => {
		const name = 'name-with-./*'

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				name
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOName: Invalid value "${name}"`)
			})
	})

	it('Register failed - Invalid email format', () => {
		const email = 'name.test'
		
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				email
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOEmail: Invalid value "${email}"`)
			})
	})

	it('Register failed - Invalid password format', () => {
		const password = 'pass'

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				...user,
				password
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOPassword: Invalid value "${password}"`)
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