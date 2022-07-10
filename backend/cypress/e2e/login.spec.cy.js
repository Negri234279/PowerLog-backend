describe('Test Endpoints Login', () => {
	it('Login succesfully', () => {	
		cy.request('POST', 'auth/login', {
			'email': 'test@test.com',
			'password': 'Administrador1234'
		})
			.then(res => {
				expect(res.status).to.eq(200)
			})
	}),

	it('Login failed - Invalid email format', () => {
		cy.request({
			method: 'POST',
			url: 'auth/login',
			failOnStatusCode: false,
			headers: { 'Content-Type': 'application/json' },
			body: {
				'email': 'testtest.com',
				'password': 'Administrador1234'
			}
		})
		.then(res => {
			expect(res.status).to.eq(400)
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
				expect(res.status).to.eq(409)
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
				expect(res.status).to.eq(409)
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