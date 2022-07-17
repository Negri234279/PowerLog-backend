import uuid from 'uuid-random'
import { randomWorkout } from '../../utils/randomWorkout.js'

const url = 'workout'

const workout = randomWorkout()

let userAuthorization


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
				userAuthorization = res.body
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
				'Authorization': userAuthorization
			},
			body
		})
			.then(res => {
				expect(res.status).to.eq(201)
			})
	})

	it('Workout failed - Duplicated ID', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userAuthorization
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

	it('Workout failed - Missing fields', () => {
		cy.request({
			method: 'POST',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userAuthorization
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
				'Authorization': userAuthorization
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