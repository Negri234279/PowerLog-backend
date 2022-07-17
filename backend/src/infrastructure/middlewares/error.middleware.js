import { ApplicationConflictException } from '../../application/errors/applicationConflict.exception.js'
import { ApplicationUnauthorizedException } from '../../application/errors/applicationUnauthorized.exeption.js'
import { DomainFormatException } from '../../domain/errors/domainFormat.exception.js'
import { VOFormatException } from '../../domain/errors/voFormat.exeption.js'
import { InfrastructureFormatException } from '../errors/infrastructureFormat.exception.js'
import { InvalidTokenException } from '../errors/invalidToken.exeption.js'
import { MissingTokenException } from '../errors/missingToken.exception.js'

export const errorMiddleware = (error, req, res, next) => {
	console.log('\x1b[0;31m' + error.message)

	if (error instanceof DomainFormatException) {
		return res.status(400).send(error.message)
	}

	if (error instanceof ApplicationConflictException)
		return res.status(409).send(error.message)
	
	if (error instanceof ApplicationUnauthorizedException)
		return res.status(401).send(error.message)

	if (error instanceof InfrastructureFormatException) {
		if (error instanceof MissingTokenException) return res.status(401).send(error.message)
		if (error instanceof InvalidTokenException) return res.status(403).send(error.message)

		return res.status(400).send(error.message)
	}
	
	return res.status(500).send('Internal Server Error')
	
}