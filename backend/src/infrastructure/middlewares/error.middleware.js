const InvalidEmailFormatException = require("../../domain/errors/invalidEmailFormat.exception")
const InvalidPasswordFormatException = require("../../domain/errors/invalidPasswordFormat.exception")
const UnauthorizedException = require("../../shared/errors/unauthorized.exception")

const errorMiddleware = (error, req, res, next) => {
	console.log('\x1b[0;31m' + error.message)

	switch (error.constructor) {
		case InvalidEmailFormatException:
		case InvalidPasswordFormatException:
			return res.status(400).send(error.message)

		case UnauthorizedException:
			return res.status(401).send(error.message)
	
		default:
			return res.status(500).send('Error interno del servidor')
	}
}

module.exports = errorMiddleware