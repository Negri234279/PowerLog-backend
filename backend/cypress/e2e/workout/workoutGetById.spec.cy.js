import uuid from 'uuid-random'
import { randomWorkout } from '../../utils/randomWorkout.js'

const url = 'workout'

const workout = randomWorkout()
const workout2 = randomWorkout()

let Authorization


describe('Test Endpoints Workout', () => {
	it('Get Authorization', () => {
		const REGEX_JWT = /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm
		cy.request('POST', 'auth/login', {
			'email': 'test@test.com',
			'password': 'Administrador1234'
		})
			.then(res => {
				expect(res.status).to.eq(200)
				expect(REGEX_JWT.test(res.body)).to.be.true
				Authorization = res.body
			})
	})

	it('Workout succesfully', () => {
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
			.then(res => {
				expect(res.status).to.eq(201)
			})
	})

	it('Workout failed - Duplicated ID', () => {
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
			})
	})

	it('Workout failed - Invalid name format', () => {
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
			})
	})

	it('Workout failed - Invalid sets format', () => {
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
			})
	})

	it('Workout failed - Invalid reps format', () => {
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
			})
	})

	it('Workout failed - Invalid weight format', () => {
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
			})
	})

	it('Workout failed - Invalid date format', () => {
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
			})
	})

	it('Workout failed - Missing fields', () => {
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
			})
	})

	it('Workout failed - Unnecesary fields', () => {
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
				})
	})

})