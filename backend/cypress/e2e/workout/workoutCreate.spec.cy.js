import uuid from 'uuid-random'
import { generateToken } from '../../utils/generateAuth.js'
import { randomWorkout } from '../../utils/randomWorkout.js'

const url = 'workout'

const workout = randomWorkout()
const workout2 = randomWorkout()

let Authorization


describe('Test endpoints workout create', () => {
	it('Get Authorization', () => {
		const REGEX_JWT = /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm
		cy.request('POST', 'auth/login', {
			'email': 'test@test.com',
			'password': 'Administrador1234'
		})
			.then(res => {
				expect(res.status).to.eq(200)
				expect(REGEX_JWT.test(res.body)).to.be.true
				expect(res.body).to.be.an('string')
				Authorization = res.body
			})
	})

	it('Workout create succesfully', () => {
		const body = {
			id: uuid(),
			name: "DL",
			sets: 2,
			reps: 4,
			weight: 130,
			date: "02/02/2022"
		}

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body
		})
			.then(res => expect(res.status).to.eq(201))
	})

	it('Workout create failed - Duplicated ID', () => {
		const id = ''
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout,
				id: '0f476be6-b0cf-4984-90e7-ad2d7041cf0a'
			}
		})
			.then(res => {
				expect(res.status).to.eq(409)
				expect(res.body).to.eq('The ID is already in use')
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Invalid name format', () => {
		const name = "asdfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadf"

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout2,
				name
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOName: Invalid value "${name}"`)
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Invalid sets format', () => {
		const sets = 124

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout2,
				sets
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOSets: Invalid value ${sets}`)
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Invalid reps format', () => {
		const reps = 1249

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout2,
				reps
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOReps: Invalid value ${reps}`)
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Invalid weight format', () => {
		const weight = 12497

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout2,
				weight
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VOWeight: Invalid value ${weight}`)
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Invalid date format', () => {
		const date = '98/24/9657'

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout2,
				date
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq(`VODate: Invalid value "${date}"`)
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Not exist user ID', async () => {
		const Authorization = await generateToken('edf53d88-1d56-4b49-a4cd-e34c8f558b55')

		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: workout
		})
			.then(res => {
				expect(res.status).to.eq(401)
				expect(res.body).to.eq('Wrong credentials')
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Missing fields', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				name: 'SQLB'
			},
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Missing fields format')
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout create failed - Unnecesary fields', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout,
				age: 25
			},
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Unnecessary fields format')
				expect(res.body).to.be.an('string')
			})
	})

})