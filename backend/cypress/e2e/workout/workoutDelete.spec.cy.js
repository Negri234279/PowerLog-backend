import { generateToken } from '../../utils/generateAuth'

const url = 'workout/0f476be6-b0cf-4984-90e7-ad2d7041cf0a'

let Authorization


describe('Test Endpoints Workout delete', () => {
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
			id: '8486b336-04da-4efd-a51b-d151f00a7e8a',
			name: "DL",
			sets: 2,
			reps: 4,
			weight: 130,
			date: "02/02/2022"
		}

		cy.request({
			method: 'POST',
			url: 'workout',
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body
		})
			.then(res => expect(res.status).to.eq(201))
	})

	it('Workout delete succesfully', () => {
		const id = '8486b336-04da-4efd-a51b-d151f00a7e8a'

		cy.request({
			method: 'DELETE',
			url: `workout/${id}`,
			failOnStatusCode: false,
			headers: { Authorization }
		})
			.then(res => expect(res.status).to.eq(204))
	})

	it('Workout delete failed - Not exist user ID', async () => {
		const Authorization = await generateToken('edf53d88-1d56-4b49-a4cd-e34c8f558b55')

		cy.request({
			method: 'DELETE',
			url,
			failOnStatusCode: false,
			headers: { Authorization }
		})
			.then(res => {
				expect(res.status).to.eq(401)
				expect(res.body).to.eq('Wrong credentials')
				expect(res.body).to.be.an('string')
			})
	})

	it('Workout delete failed - Not exist ID', () => {
		const id = '6ed7dd1e-eb24-41fd-b834-9c639bcf6564'

		cy.request({
			method: 'DELETE',
			url: `workout/${id}`,
			failOnStatusCode: false,
			headers: { Authorization }
		})
			.then(res => {
				expect(res.status).to.eq(404)
				expect(res.body).to.eq('The ID is not found in use')
				expect(res.body).to.be.an('string')
			})
	})

	/*it('Workout delete failed - Missing fields', () => {
		cy.request({
			method: 'DELETE',
			url: 'workout',
			failOnStatusCode: false,
			headers: { Authorization }
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Missing fields format')
				expect(res.body).to.be.an('string')
			})
	})*/

	it('Workout delete failed - Unnecesary fields', () => {
		cy.request({
			method: 'DELETE',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: { age: 25 }
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Unnecessary fields format')
				expect(res.body).to.be.an('string')
			})
	})

})