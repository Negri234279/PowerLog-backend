import { generateToken } from '../../utils/generateAuth.js'

const url = 'workout/0f476be6-b0cf-4984-90e7-ad2d7041cf0b'

const workout = {
	name: "DL",
	sets: 2,
	reps: 4,
	weight: 200,
	date: "12/12/2022"
}

let Authorization


describe('Test Endpoints Workout update', () => {
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

	it('Workout update succesfully', () => {
		const id = '0f476be6-b0cf-4984-90e7-ad2d7041cf0b'

		cy.request({
			method: 'PATCH',
			url: `workout/${id}`,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: workout
		})
			.then(res => expect(res.status).to.eq(204))
	})

	it('Workout update failed - Not exist ID', () => {
		const id = '6ed7dd1e-eb24-41fd-b834-9c639bcf6564'

		cy.request({
			method: 'PATCH',
			url: `workout/${id}`,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: workout
		})
			.then(res => {
				expect(res.status).to.eq(404)
				expect(res.body).to.eq('The ID is not found in use')
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout update failed - Not exist user ID', async () => {
		const Authorization = await generateToken('edf53d88-1d56-4b49-a4cd-e34c8f558b55')

		cy.request({
			method: 'PATCH',
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

	/*it('Workout update failed - Missing fields', () => {
		cy.request({
			method: 'PATCH',
			url: 'workout',
			failOnStatusCode: false,
			headers: { Authorization }
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Missing fields format')
			})
	})*/

	it('Workout update failed - Unnecesary fields', () => {
		cy.request({
			method: 'PATCH',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: {
				...workout,
				age: 25			
			}
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Unnecessary fields format')
				expect(res.body).to.be.an('string')
			})
	})

})