import { DomainFormatException } from './domainFormat.exception.js'

export class InvalidNameFormatException extends DomainFormatException {
    constructor() {
        super('Formato de nombre inválido')
    }
}