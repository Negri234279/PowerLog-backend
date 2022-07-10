describe('Test Endpoints Login', () => {
	it('Login succesfully', () => {
		const REGEX_JWT = /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm
		cy.request('POST', 'auth/login', {
			'email': 'test@test.com',
			'password': 'Administrador1234'
		})
			.then(res => {
				expect(res.status).to.eq(200)
				expect(REGEX_JWT.test(res.body)).to.be.true
			})
	}),

	it('Login failed - Invalid email format', () => {
		cy.request({
			method: 'POST',
			url: 'auth/login',
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				'email': 'tesest.com',
				'password': 'Administrador1234'
			}
		})
		.then(res => {
			expect(res.status).to.eq(401)
			expect(res.body).to.eq('Wrong credentials')
		})
	}),

	it('Login failed - Invalid email exist', () => {
		cy.request({
			method: 'POST',
			url: 'auth/login',
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				'email': 'rafalejo@gmail.com',
				'password': 'Administrador1234'
			}
		})
			.then(res => {
				expect(res.status).to.eq(401)
				expect(res.body).to.eq('Wrong credentials')
			})
	}),

	it('Login failed - Invalid password', () => {
		cy.request({
			method: 'POST',
			url: 'auth/login',
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				'email': 'test@test.com',
				'password': 'Administrador'
			},
		})
			.then(res => {
				expect(res.status).to.eq(401)
				expect(res.body).to.eq('Wrong credentials')
			})
	}),

	it('Login failed - Missing fields', () => {
		cy.request({
			method: 'POST',
			url: 'auth/login',
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				'email': 'test@test.com'
			},
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Missing fields format')
			})
	}),

	it('Login failed - Unnecesary fields', () => {
		cy.request({
			method: 'POST',
			url: 'auth/login',
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				'email': 'test@test.com',
				'password': 'Administrador123',
				'name': 'test'
			},
		})
			.then(res => {
				expect(res.status).to.eq(400)
				expect(res.body).to.eq('Unnecessary fields format')
			})
	})

})