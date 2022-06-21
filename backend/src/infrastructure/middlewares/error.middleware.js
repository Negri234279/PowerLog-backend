const ApplicationConflictException = require('../../application/errors/applicationConflict.exception')
const DomainFormatException = require('../../domain/errors/domainFormat.exception')
const InfrastructureFormatException = require('../errors/infrastructureFormat.exception')
const InvalidTokenException = require('../errors/invalidToken.exeption')
const MissingTokenException = require('../errors/missingToken.exception')

const errorMiddleware = (error, req, res, next) => {
	console.log('\x1b[0;31m' + error.message)

	if (error instanceof DomainFormatException) {
		return res.status(400).send(error.message)
	}

	if (error instanceof InfrastructureFormatException) {
		if (error instanceof MissingTokenException) return res.status(401).send(error.message)
		if (error instanceof InvalidTokenException) return res.status(403).send(error.message)

		return res.status(400).send(error.message)
	}

	if (error instanceof ApplicationConflictException)
		return res.status(409).send(error.message)
	
	return res.status(500).send('Error interno del servidor')
	
}

module.exports = errorMiddleware