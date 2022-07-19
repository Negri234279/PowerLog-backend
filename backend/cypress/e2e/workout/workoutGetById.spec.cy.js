import { generateToken } from '../../utils/generateAuth.js'

const url = 'workout/45e16863-0ec8-41ba-9118-f987ebb0c9cb'

let Authorization


describe('Test Endpoints Workout get by id', () => {
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

	it('Workout get succesfully', () => {
		cy.request({
			method: 'get',
			url,
			failOnStatusCode: false,
			headers: {
				'Content-Type': 'application/json',
				Authorization
			}
		})
			.then(res => {
				expect(res.status).to.eq(200)
				expect(res.body).to.be.an('object')
				expect(res.body).to.deep.eq({
					"id": "45e16863-0ec8-41ba-9118-f987ebb0c9cb",
					"name": "DL",
					"weight": 110,
					"reps": 5,
					"sets": 5,
					"date": "2022-01-01T00:00:00.000Z",
					"idUser": "0f476be6-b0cf-4984-90e7-ad2d7041cf0e"
				})
			})
	})

	it('Workout get failed - Not exist user ID', async () => {
		const Authorization = await generateToken('edf53d88-1d56-4b49-a4cd-e34c8f558b55')

		cy.request({
			method: 'get',
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

	it('Workout get failed - Not exist ID', () => {
		const id = '6ed7dd1e-eb24-41fd-b834-9c639bcf6564'

		cy.request({
			method: 'get',
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

	/*it('Workout get failed - Missing fields', () => {
		cy.request({
			method: 'get',
			url,
			failOnStatusCode: false,
			headers: { Authorization }
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Missing fields format')
			})
	})*/

	it('Workout get failed - Unnecesary fields', () => {
		cy.request({
			method: 'get',
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