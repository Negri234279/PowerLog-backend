import { DomainFormatException } from './domainFormat.exception.js'

export class VOFormatException extends DomainFormatException {
    constructor(constructorName, value) {
        super(`${constructorName}: Invalid value ${JSON.stringify(value)}`)
    }
}