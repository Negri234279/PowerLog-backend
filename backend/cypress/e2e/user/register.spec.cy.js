import uuid from 'uuid-random'
import { randomUser } from '../../utils/randomUser'

const url = 'auth/register'

describe('Test Endpoints Register', () => {

	it('Register succesfully', () => {
		const user = randomUser()

		cy.request('POST', url, user)
			.then(res => {
				expect(res.status).to.eq(201)
			})
	})

	it('Register failed - Duplicated ID', () => {
		const user = randomUser()
		const id = '0f476be6-b0cf-4984-90e7-ad2d7041cf0e'

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
				expect(res.status).to.eq(409)
				expect(res.body).to.eq('The ID is already in use')
			})
	})

	it('Register failed - Duplicated email', () => {
		const user = randomUser()
		const email = 'test@test.com'

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
				expect(res.status).to.eq(409)
				expect(res.body).to.eq('The email is already in use')
			})
	})

	it('Register failed - Invalid ID format', () => {
		const user = randomUser()
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
		const user = randomUser()
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
		const user = randomUser()
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
		const user = randomUser()
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
		const user = randomUser()

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